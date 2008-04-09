require 'rubygems'
require 'hpricot'
#require 'open-uri'
require 'uri'
require 'net/http'
require 'mechanize'
require 'json'
require 'cgi'

IKARIAM_MAIN_URI = "http://www.ikariam.org/"
MAIN_URI = "http://www.ikariam.org/"
S3_URI = "http://s3.ikariam.org/index.php"

cookie = nil

PARSER_JS = <<-eos
 for (var x in m) {
    for (var y in m[x]) {
        print(m[x][y][3] + "," + m[x][y][0] + "," + x + "," + y);
    }
}
eos

def parse_number(num)
  stripped = num.gsub(/\,/, '')
  stripped = num.gsub(/ /, '')
  stripped = num.split(",").join("")
  return stripped.to_i
end

def parse_city(city)
#  coordinates = city_string.match(/\[.*:.*\]/)
  city_string = city.inner_html
  numbers = city_string.scan(/([0-9]+)/)
  x = Integer(numbers[0][0])
  y = Integer(numbers[1][0])

  name_string = city_string.match(/(.*\[)/)[0]
  name = name_string[0, name_string.length-2]
  return {:name => name, :x => x, :y => y, :hyperlink => S3_URI + city['href']}
end

class MachineElf
  attr_accessor :home_secretary_missing, :home_secretary_page, :testing, :agent, :main_page, :logged_in, :gold, :username, :password, :towns, :islands, :alliance_members

  def meat_tube
    if !@testing
      delay = rand*15
      print "I'm a human, I promise!  Sleeping for #{delay}...\n"
      sleep(rand*15)
    end
  end

  def login
    # I don't actually navigate through the main page in true mechanize form, because the main page relies on javascript
    # for the login form.
    if !@logged_in
      print("logging in with user #{@username}...\n")
      # @login_page_contents = open_with_post(IKARIAM_MAIN_URI, "name=#{@username}&password=#{@password}&action=loginAvatar&function=login")
      # @login_page = Hpricot(@login_page_contents)
      # @logged_in = true
      # fetch the login page anyway, even though I don't use it.
      meat_tube
      login_page_ignored = @agent.get(MAIN_URI)

      # actually POST my login to Gamma
      meat_tube
      login_output = @agent.get(S3_URI, {:name => @username, :password => @password, :action => 'loginAvatar', :function => 'login'})
      @logged_in = true
    end
  end

  def needs_main_page
    if @main_page.nil?
      meat_tube
      @main_page = @agent.get(S3_URI)
    end
  end

  def needs_home_secretary_page
    if @home_secretary_page.nil?
      meat_tube
      @home_secretary_page = @agent.get(S3_URI + "?view=embassyHomeSecretaryMembers&id=82966&position=10")

    end
  end

  def get_alliance_member_stats
    needs_home_secretary_page
    content_block = @home_secretary_page.at('#mainview').at("//div[@class='content']")
    players = { }
    # pp content_block
    body = content_block.at('table') # .at('tbody')
    if body.nil?
      print "Andrew, are you *really* sure you have home secretary...?"
      @missing_home_secretary = true
      return
    end
    rows = body/"tr"
    # strip off the header and total rows
    real_rows = rows[1..-2]
    real_rows.each do |row|
      elements = row/"td"
      name = elements[0].inner_html
      gold = parse_number(elements[1].inner_html)
      wood = parse_number(elements[2].inner_html)
      wine = parse_number(elements[3].inner_html)
      marble = parse_number(elements[4].inner_html)
      crystal = parse_number(elements[5].inner_html)
      sulphur = parse_number(elements[6].inner_html)
      players[name] = {:gold => gold,
        :wood => wood, :wine => wine, :marble => marble,
        :crystal => crystal, :sulphur => sulphur }
    end
    return players
  end

  def get_alliance_members
    meat_tube
    alliance_page = @agent.get(S3_URI + "?view=embassy&id=82966&position=10")
    members_table = alliance_page.at("#memberList").at("tbody")
    rows = members_table/"tr"
    other_stats = get_alliance_member_stats
    rows.each do |row|
      name = (row/"td")[2].inner_html
      score = parse_number(row.at("//td[@class='score']").inner_html)
      cities = []
      cities_td = row.at("//td[@class='cities']")
      # pp cities_td
      if cities_td.nil?
        print "Are you sure you have home secretary, Andrew?\nGiving up on retrieving alliance member list...\n"
        @home_secretary_missing = true
        return
      end
      city_as = cities_td/"a"
      city_as.each do |a|
        cities << parse_city(a)
      end

      @alliance_members << { :name => name, :score => score, :cities => cities}.merge(other_stats[name])
    end
  end

  def print_report
    if @home_secretary_missing
      return "Dan is a nub and didn't legislate homeland security.\n\n\n\n_We're no strangers to love_\n\n_You know the rules and so do I_\n\n_A full commitment's what I'm thinking of_\n\n_You wouldn't get this from any other guy..._\n"
    end
    output = ""
    output << ("\nAlliance members:<br/>\n")
    output << "| _Player_ | _Score_ | _Gold_ | _Wood_ | _Wine_ | _Marble_ | _Crystal Glass_ | _Sulphur_ | . | x | y |\n"
    @alliance_members.each do |guy|
      output << ("| *#{guy[:name]}* | %{color:red}#{guy[:score]}% | %{color:gold}#{guy[:gold]}% | %{color:brown}#{guy[:wood]}% | %{color:purple}#{guy[:wine]}% | %{color:grey}#{guy[:marble]}% | %{color:blue}#{guy[:crystal]}% | %{color:yellow}#{guy[:sulphur]}% |\n")
      guy[:cities].each do |city|
        output << "| . | . | . | . | . | . | . | . | \"#{city[:name]}\":#{city[:hyperlink]} | #{city[:x]} | #{city[:y]} |\n"
      end
    end
    return output
  end

  def scrape
    login
#    get_gold
#    get_my_towns
    get_alliance_members
  end

  def initialize(username, password, agent=nil, testing=false)
    @username = username
    @password = password
    @testing = testing
    @home_secretary_missing = false
    @alliance_members = []
    if agent.nil?
      @agent = WWW::Mechanize.new
      @agent.user_agent_alias = 'Windows IE 7'
    else
      @agent = agent
    end
  end
end
