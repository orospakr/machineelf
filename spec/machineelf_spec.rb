require 'libmachineelf'

require 'spec'
require 'mechanize'
require "redcloth"

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

  def login(elf)
    @agent.should_receive(:get).once.with("http://www.ikariam.org/")
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php", {:password=>"sailboat", :name=>"somedude", :action=>"loginAvatar", :function=>"login"})
    elf.login
  end

  it "should grab main page and POST login to Gamma" do
    login(@elf)
  end

  it "should retrieve alliance members" do
    login(@elf)
    embassy_page = get_fixture('embassy')
    members_page = get_fixture('embassyHomeSecretaryMembers')

    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassy&id=82966&position=10").
      and_return(embassy_page)
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassyHomeSecretaryMembers&id=82966&position=10").
      and_return(members_page)
    @elf.scrape

    orospakr = @elf.alliance_members[0]
    mal = @elf.alliance_members[12]

    orospakr.name.should == "orospakr"
    orospakr.score.should == 510
    orospakr.gold.should == 14745
    orospakr.wood.should == 291
    orospakr.wine.should == 1710
    orospakr.marble.should == 284
    orospakr.crystal.should == 49
    orospakr.sulphur.should == 8

    mal.name.should == 'Mal'
    mal.score.should == 453
    mal.gold.should == 11097
    mal.wood.should == 706
    mal.wine.should == 419
    mal.marble.should == 48
    mal.crystal.should == 4
    mal.sulphur.should == 21

    oropolis = orospakr.cities[0]
    oropolis.x.should == 95
    oropolis.y.should == 65
    oropolis.hyperlink.should == 'http://s3.ikariam.org/index.php?view=island&id=3909&selectCity=82966'
    oropolis.name.should == 'Oropolis'

    ivarion = orospakr.cities[1]
    ivarion.x.should == 94
    ivarion.y.should == 65
    ivarion.hyperlink.should == 'http://s3.ikariam.org/index.php?view=island&id=3910&selectCity=91576'
    ivarion.name.should == 'Ivarion'
  end

  it "should not die if home secretary is not available" do
    login(@elf)
    embassy_page = get_fixture('embassyWithoutHomeSecretaryTurnedOn')

    members_page = get_fixture('embassyWithoutHomeSecretaryTurnedOnMembers')
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassy&id=82966&position=10").
      and_return(embassy_page)
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassyHomeSecretaryMembers&id=82966&position=10").
      and_return(members_page)
    @elf.scrape
    @elf.alliance_members.length.should == 0
    @elf.print_report.should == "Dan is a nub and didn't legislate homeland security.\n\n\n\n_We're no strangers to love_\n\n_You know the rules and so do I_\n\n_A full commitment's what I'm thinking of_\n\n_You wouldn't get this from any other guy..._\n"

    open('/tmp/machine_elf_report_blowup.html', "w") do |rep_dump|
      markup = RedCloth.new(@elf.print_report)
      rep_dump.write(markup.to_html)
    end
  end

  it "should compute totals" do
    login(@elf)
    embassy_page = get_fixture('embassy')
    members_page = get_fixture('embassyHomeSecretaryMembers')

    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassy&id=82966&position=10").
      and_return(embassy_page)
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassyHomeSecretaryMembers&id=82966&position=10").
      and_return(members_page)
    @elf.scrape

    @elf.total_gold.should == 826993
    @elf.total_score.should == 24115
    @elf.total_wood.should == 63568
    @elf.total_wine.should == 27600
    @elf.total_marble.should == 13733
    @elf.total_crystal.should == 11126
    @elf.total_sulphur.should == 4716
  end

  it "should not throw an exception while rendering a report" do
    login(@elf)
    embassy_page = get_fixture('embassy')
    members_page = get_fixture('embassyHomeSecretaryMembers')
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassy&id=82966&position=10").
      and_return(embassy_page)
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php?view=embassyHomeSecretaryMembers&id=82966&position=10").
      and_return(members_page)
    @elf.scrape
    open('/tmp/machine_elf_report_test.html', "w") do |rep_dump|
      markup = RedCloth.new(@elf.print_report)
      rep_dump.write(markup.to_html)
    end
  end
end
