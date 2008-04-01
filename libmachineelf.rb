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

ISLANDS_WE_CARE_ABOUT = ["Issayos", "Unteos", "Cuhyios"]
COLONIES_WE_CARE_ABOUT = ["Oropolis", "Genesis", "Tiamatya"]

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

def parse_city(city_string)
#  coordinates = city_string.match(/\[.*:.*\]/)
  numbers = city_string.scan(/([0-9]+)/)
  print "numbers: "
  pp numbers
  x = Integer(numbers[0][0])
  y = Integer(numbers[1][0])

  name_string = city_string.match(/(.*\[)/)[0]
  name = name_string[0, name_string.length-2]
  return {:name => name, :x => x, :y => y}
end

class MachineElf
  attr_accessor :agent, :main_page, :logged_in, :gold, :username, :password, :towns, :islands, :alliance_members

  def login
    # I don't actually navigate through the main page in true mechanize form, because the main page relies on javascript
    # for the login form.
    if !@logged_in
      print("logging in with user #{@username}...\n")
      # @login_page_contents = open_with_post(IKARIAM_MAIN_URI, "name=#{@username}&password=#{@password}&action=loginAvatar&function=login")
      # @login_page = Hpricot(@login_page_contents)
      # @logged_in = true
      # fetch the login page anyway, even though I don't use it.
      login_page_ignored = @agent.get(MAIN_URI)

      # actually POST my login to Gamma
      login_output = @agent.get(S3_URI, {:name => @username, :password => @password, :action => 'loginAvatar', :function => 'login'})
      @logged_in = true
    end
  end

  def needs_main_page
    if @main_page.nil?
      @main_page = @agent.get(S3_URI)
    end
  end

  def get_gold
    needs_main_page
    @gold = parse_number((@main_page/'#value_gold').text)
    return @gold
  end

  def get_my_towns
    needs_main_page
    @towns = []
    towns_select = (@main_page/'#citySelect')
    towns = towns_select/('option')
    towns.each do |town|
      value = town.attributes['value']
      name = town.inner_html
      print("Town detected: #{name}.  ID number is #{value}.\n")
      @towns << get_one_of_my_towns(value)
    end
  end

  def get_one_of_my_towns(id)
    # change some state on the server, so the top bar also includes
    # the info about the city we want to inspect.
    temp_switch = @agent.get(S3_URI, {:action => 'header', :cityId => id, :function => 'changeCurrentCity', :id => id, :oldView => 'city' })
    town = @agent.get(S3_URI + "?view=city&id=#{id}")
    wood = parse_number(town.at('#value_wood').inner_html)
    wine = parse_number(town.at('#value_wine').inner_html)
    marble = parse_number(town.at('#value_marble').inner_html)
    crystal = parse_number(town.at('#value_crystal').inner_html)
    sulphur = parse_number(town.at('#value_sulfur').inner_html)
    name = town.at("//span[@class='city']").inner_html
    return {:name => name, :wood => wood, :wine => wine, :marble => marble, :crystal => crystal, :sulphur => sulphur}
  end

  def get_alliance_members
    alliance_page = @agent.get(S3_URI + "?view=embassy&id=82966&position=10")
    members_table = alliance_page.at("#memberList").at("tbody")
    rows = members_table/"tr"
    rows.each do |row|
      name = (row/"td")[2].inner_html
      score = parse_number(row.at("//td[@class='score']").inner_html)
      cities = []
      cities_td = row.at("//td[@class='cities']")
      pp cities_td
      city_as = cities_td/"a"
      city_as.each do |a|
        print "Parsing a city: #{a.inner_html}...\n"
        cities << parse_city(a.inner_html)
      end
      @alliance_members << { :name => name, :score => score, :cities => cities}
    end
  end

  def print_report
    output = ""
    output << ("\nAlliance members:\n")
    @alliance_members.each do |guy|
      output << "... *#{guy[:name]}*: (score: #{guy[:score]})\n"
      guy[:cities].each do |city|
        output << "... ... _#{city[:name]}_: (x: #{city[:x]}, y: #{city[:y]})\n"
      end
    end
    return output
  end

  def write_csv(filename)
    f = File.new(filename, "w")
    @towns.each do |t|
      f.puts("#{t[:name]}, #{t[:wine]}, #{t[:marble]},  #{t[:crystal]}, #{t[:sulphur]}\n")
    end
    f.close
  end

  def scrape
    login
    get_gold
    get_my_towns
    get_alliance_members
  end

  def initialize(username, password, agent=nil)
    @username = username
    @password = password
    @alliance_members = []
    if agent.nil?
      @agent = WWW::Mechanize.new
      @agent.user_agent_alias = 'Windows IE 7'
    else
      @agent = agent
    end
  end
end
