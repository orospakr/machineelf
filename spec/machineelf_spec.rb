require 'libmachineelf'

require 'spec'
require 'mechanize'

Spec::Runner.configure do |config|
    config.mock_with :flexmock
  end


describe MachineElf do
  before(:each) do
    @agent = flexmock(:mechanize_agent)
    @elf = MachineElf.new("somedude", "sailboat", @agent)
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

  it "should retrieve gold" do
    main_page = flexmock(:main_page)
    main_page.should_receive('text').and_return(42)
    @agent.should_receive(:get).once.with("http://s3.ikariam.org/index.php")
    main_page.should_receive('/').once.with('#value_gold').and_return(main_page)
    @elf.get_gold
    @elf.gold.should eql(42)
  end
end

