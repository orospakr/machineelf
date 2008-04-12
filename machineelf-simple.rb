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
gem 'MachineElf'
require 'machineelf'

if ARGV.length != 3
  print("usage: username password csv_file\n")
  exit(-1)
end
s = MachineElf::MachineElf.new(ARGV[0], ARGV[1])
s.scrape
print(s.print_report())
#s.write_csv(ARGV[2])
