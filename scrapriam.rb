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

require 'hpricot'
#require 'open-uri'
require 'uri'
require 'net/http'

IKARIAM_LOGIN_URI = "http://s3.ikariam.org/index.php"

cookie = nil

class Scrapriam
  attr_accessor :cookie, :login_page, :logged_in, :login_page_contents, :gold, :username, :password

  def open_with_post(uri, post_data)
    #   res = Net::HTTP.post_form(URI.parse(uri),
    #                             post_items)
    #   return res.body
    result = ""
    url = URI.parse(uri)
    headers = {'Accept' => '*/*'}
    if !@cookie.nil?
      headers['Cookie'] = cookie
    end
    #'Cookie' => 'PHPSESSID=da168a495d6c015c42b832b0dac0acb6; ikariam=%241%24P0ypxW6A%24ryg1osVg%2FTWNK.%2FdLzlG30'}
    Net::HTTP.start(url.host) do |http|
      rez = http.post(url.path, post_data, headers)
      possible_cookie = rez.get_fields('Set-Cookie')
      if !possible_cookie.nil?
        @cookie = possible_cookie
        print("My cookie is now: #{cookie}\n")
      end
      result = rez.body
    end
    return result
  end

  def login()
    if !@logged_in
      print("logging in with user #{@username}...\n")
      @login_page_contents = open_with_post(IKARIAM_LOGIN_URI, "name=#{@username}&password=#{@password}&action=loginAvatar&function=login")
      @login_page = Hpricot(@login_page_contents)
      @logged_in = true
    end
  end

  def get_gold()
    login()
    @gold = (@login_page/'#value_gold').inner_html
    return gold
  end

  def print_report()
    print("Gold: #{@gold}\n")
  end

  def scrape()
    login()
    get_gold()
  end

  def initialize(username, password)
    @username = username
    @password = password
  end
end



# contents = open(IKARIAM_LOGIN_URI,
#                 {
#                   :method => :post,
#                   :body => 'username=#{USERNAME}&password=#{PASSWORD}'
#                 })
# contents = open_with_post(IKARIAM_LOGIN_URI, "name=#{USERNAME}&password=#{PASSWORD}&action=loginAvatar&function=login")
# doc = Hpricot(contents)
# print("My cookie is now: #{cookie}\n")
# gold = (doc/'#value_gold').inner_html

if ARGV.length != 2
  print("usage: username password\n")
  exit(-1)
end
s = Scrapriam.new(ARGV[0], ARGV[1])
s.scrape()
s.print_report()
