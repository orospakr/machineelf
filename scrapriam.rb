#!/usr/bin/env ruby

# require 'open-uri'
# open('http://www.example.com/', {
#        :method           => :post,
#        :body             => 'a=123&b=456',
#        'User-Agent'      => 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ja; rv:1.8.1.12) Gecko/20080201 Firefox/2.0.0.12',
#        'Accept'          => 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
#        'Accept-Language' => 'ja,en-us;q=0.7,en;q=0.3',
#        'Accept-Charset'  => 'Shift_JIS,utf-8;q=0.7,*;q=0.7',
#        'Referer'         => "http://www.example.com/"}) do |line|
#     puts line.read
# end
require 'rubygems'
require 'hpricot'
#require 'open-uri'
require 'uri'
require 'net/http'
require 'mechanize'
require 'json'
require 'cgi'

IKARIAM_MAIN_URI = "http://www.ikariam.org/"
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

class Scrapriam
  attr_accessor :agent, :cookie, :main_page, :logged_in, :gold, :username, :password, :towns, :islands

#   def open_with_post(uri, post_data)
#     #   res = Net::HTTP.post_form(URI.parse(uri),
#     #                             post_items)
#     #   return res.body
#     result = ""
#     url = URI.parse(uri)
#     headers = {'Accept' => '*/*'}
#     if !@cookie.nil?
#       headers['Cookie'] = cookie
#     end
#     #'Cookie' => 'PHPSESSID=da168a495d6c015c42b832b0dac0acb6; ikariam=%241%24P0ypxW6A%24ryg1osVg%2FTWNK.%2FdLzlG30'}
#     Net::HTTP.start(url.host) do |http|
#       rez = http.post(url.path, post_data, headers)
#       possible_cookie = rez.get_fields('Set-Cookie')
#       if !possible_cookie.nil?
#         @cookie = possible_cookie
#         print("My cookie is now: #{cookie}\n")
#       end
#       result = rez.body
#     end
#     return result
#   end

  def login()
    # I don't actually navigate through the main page in true mechanize form, because the main page relies on javascript
    # for the login form.
    if !@logged_in
      print("logging in with user #{@username}...\n")
      # @login_page_contents = open_with_post(IKARIAM_MAIN_URI, "name=#{@username}&password=#{@password}&action=loginAvatar&function=login")
      # @login_page = Hpricot(@login_page_contents)
      # @logged_in = true
      @main_page = @agent.get(S3_URI, {:name => @username, :password => @password, :action => 'loginAvatar', :function => 'login'})
      @logged_in = true
    end
  end

  def get_gold()
    @gold = parse_number((@main_page/'#value_gold').text)
    return @gold
  end

  def get_towns()
    @towns = []
    towns_select = (@main_page/'#citySelect')
#    pp towns_select
    towns = towns_select/('option')
    towns.each do |town|
      value = town.attributes['value']
      name = town.inner_html
      print("Town detected: #{name}.  ID number is #{value}.\n")
      @towns << get_town(value)
    end
#     towns_select.each do |t|
#       pp t
#       #print("\n")
#       town = t.at('option')
#       #print(town.type)
#       value = town.attributes['value']
#       name = town.inner_html
#       print("Town detected: #{name}.  ID number is #{value}.\n")
#       @towns << get_town(value)
#     end
  end

  def get_town(id)
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

  def print_report()
    print("Gold: #{@gold}\n")
     @towns.each do |t|
      print("Town: #{t[:name]}\n")
      print("... wood: #{t[:wood]}\n")
      print("... wine: #{t[:wine]}\n")
      print("... marble: #{t[:marble]}\n")
      print("... crystal: #{t[:crystal]}\n")
      print("... sulphur: #{t[:sulphur]}\n")
     end
  end

  def get_world_map
    world_map = @agent.get(S3_URI, { :view => 'worldmap_iso', })
    # //*[@id="tile_5_8"]
    @islands = []

    isomap_container = world_map.at('#container2')
    big_javascript = isomap_container.at('script').inner_html
#    print big_javascript
#    pp JSON.parse(big_javascript)


    # get index of "m = new Array;m[0]" for beginning
    content_begin = big_javascript.index "m = new Array;m["
    content_end = big_javascript.index "MAXSIZE = 8;"
    map_javascript = big_javascript[content_begin,content_end-1]
    #map_json = map_javascript.gsub(/m = new Array;/, " \"map\" '] {")
    #map_json = map_json.gsub(/m\[.\] = new Array;/, "[")

    f = open('/tmp/wtf.js', "w")
    f.puts(map_javascript)
    f.close

    output = ''
    with_dumper = map_javascript + PARSER_JS
#    print with_dumper
    IO.popen("smjs", "w+") do |pipe|
      pipe.puts with_dumper
      pipe.close_write  # If other_program process doesn't flush its output, you probably need to use this to send an end-of-file, which tells other_program to give us its output. If you don't do this, the program may hang/block, because other_program is waiting for more input.
      output = pipe.read
    end
    output.split().each do |line|
      things = line.split(',')
      @islands << things
    end

  pp @islands

    #map = JSON.parse(map_javascript)

    # get index of "= new Array;MAXSIZE = 8;" for end (plus appropriate subtraction)
    # process contents thereof as JSON (or similar?)

  end

  def write_csv(filename)
    f = File.new(filename, "w")
    @towns.each do |t|
      f.puts("#{t[:name]}, #{t[:wine]}, #{t[:marble]},  #{t[:crystal]}, #{t[:sulphur]}\n")
    end
    f.close()
  end

  def scrape()
    login
    get_gold
    get_towns
    get_world_map
  end

  def initialize(username, password)
    @username = username
    @password = password
    @agent = WWW::Mechanize.new
  end

end

if ARGV.length != 3
  print("usage: username password csv_file\n")
  exit(-1)
end
s = Scrapriam.new(ARGV[0], ARGV[1])
s.scrape()
s.print_report()
s.write_csv(ARGV[2])
