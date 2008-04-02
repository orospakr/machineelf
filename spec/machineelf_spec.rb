require 'libmachineelf'

require 'spec'
require 'mechanize'

Spec::Runner.configure do |config|
    config.mock_with :flexmock
  end

def get_fixture(name)
  f = open("#{Dir.getwd}/spec/fixtures/#{name}.html")
  html = f.read
  f.close
  Hpricot(html)
end

describe MachineElf do
  before(:each) do
    @agent = flexmock(:mechanize_agent)
    @elf = MachineElf.new("somedude", "sailboat", @agent, true)
  end

  it "should grab main page and POST login to Gamma" do
    # main page load
#     @agent.should_receive(:get).twice do |arg|
#       actual << arg
#     end
    @agent.should_receive(:get).once.with("http://www.ikariam.org/")
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php", {:password=>"sailboat", :name=>"somedude", :action=>"loginAvatar", :function=>"login"})
    @elf.login
  end

#   it "should retrieve gold" do
#     main_page = flexmock(:main_page)
#     main_page.should_receive('text').and_return(42)
#     @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php")
#     main_page.should_receive('/').once.with('#value_gold').and_return(main_page)
#     @elf.get_gold
#     @elf.gold.should eql(42)
#   end

  it "should retrieve gold" do
    h = get_fixture('main_page')
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php").
      and_return(h)
    @elf.get_gold
    @elf.gold.should eql(14681)
  end

  it "should retrieve alliance members" do
    embassy_page = get_fixture('embassy')
    members_page = get_fixture('embassyHomeSecretaryMembers')

    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassy&id=82966&position=10").
      and_return(embassy_page)
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassyHomeSecretaryMembers&id=82966&position=10").
      and_return(members_page)
    @elf.get_alliance_members
    @elf.alliance_members[0].should == {:name=>"orospakr", :gold => 14745, :wood => 291, :wine => 1710, :marble => 284, :crystal => 49, :sulphur => 8, :score=>510, :cities=>[{:name=>"Oropolis", :x=>95, :y=>65}, {:name=>"Ivarion", :x=>94, :y=>65}]}
    # @elf.alliance_members[12].should == {:score=>453, :name=>"Mal", :cities=>[{:name=>"Pentaglia", :x=>68, :y=>17}, {:name=>"Polis", :x=>13, :y=>51}]}
  end

  it "should not die if home secretary is not available" do
    h = get_fixture('embassyWithoutHomeSecretaryTurnedOn')
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassy&id=82966&position=10").
      and_return(h)
    @elf.get_alliance_members
    @elf.alliance_members.length.should == 0
  end
end
