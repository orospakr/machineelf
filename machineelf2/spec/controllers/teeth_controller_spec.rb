require File.dirname(__FILE__) + '/../spec_helper'

describe TeethController do

  #Delete this example and add some real ones
  it "should use TeethController" do
    controller.should be_an_instance_of(TeethController)
  end

  describe "receiving HTML uploads from Ikariam" do

    def ikariam_page(page_name)
      results = ''
      open(File.dirname(__FILE__) + "/../fixtures/pages/#{page_name}.html", "rb") do |f|
        results = f.read
      end
      results
    end

    def ikariam_url(page_name)
      names = { :view_city => 'http://s3.ikariam.org/index.php?view=city&id=82966' }
      return names[page_name]
    end

    def ikariam_cookie(page_name)
      cookies = { :view_city => '57667_%241%24IB9rEhZ6%24qlO9SH0R3SGe4BzL.t3rN1'}
      return cookies[page_name]
    end

    def expects(model, expectations)
      expectations.each_pair do |field, val|
        model.should_receive("#{field.to_s}=".intern).with(val)
      end
    end

    def do_scrape_page_fixture(page_name)
      post :scree, {:ikariam_page => ikariam_page(page_name), :ikariam_url => ikariam_url(page_name), :ikariam_cookie => ikariam_cookie(page_name)}
    end

    def do_scrape_contents_only(page_name)
      post :scree_contents, {:ikariam_page => ikariam_page(page_name), :ikariam_url => ikariam_url(page_name), :ikariam_cookie => ikariam_cookie(page_name)}
    end

    def do_scrape_menu_only(page_name)
      post :scree_menu, {:ikariam_page => ikariam_page(page_name), :ikariam_url => ikariam_url(page_name), :ikariam_cookie => ikariam_cookie(page_name)}
    end

    before(:each) do

    end

    it "should munch a view_city page" do
      @town = mock_model(Town)
      @island = mock_model(Island)
      @player = mock_model(Player)

      Town.should_receive(:by_ikariam_id).with(82966).and_return(@town)
      Island.should_receive(:by_ikariam_id).with(3909).and_return(@island)
      Player.should_receive(:by_ikariam_id).with(57667).and_return(@player)

      @town.should_receive(:save!)
      expects(@town, { :name => 'Mobotropolis', :island => @island })

      expects(@island, { :name => 'Issayos'})
      @island.should_receive(:save!)

      expects(@player, { :ikariam_login => 'orospakr'})
      @player.should_receive(:save!)

      # now to test data point creation...

      @town_event = mock_model(TownEvent)
      TownEvent.should_receive(:new).and_return(@town_event)
      # This doesn't cover all of the build types.
      # Must get a look at a town belonging to a high-level
      # person...
      expects(@town_event, { :town => @town,
                :town_hall => 17, :trading_port => 5,
                :shipyard => 2, :tavern => 11,
                :barracks => 4, :academy => 12,
                :warehouse => 10, :hideout => 5,
                :museum => 4, :trading_post => 6,
                :embassy => 1, :palace => 2,
                :town_wall => 8})
      @town_event.should_receive(:save!)


      do_scrape_contents_only :view_city
    end

    it "should much a view_city's page toolbar" do
      @town = mock_model(Town)
      @player = mock_model(Player)
      @town_event = mock_model(TownEvent)
      @player_event = mock_model(PlayerEvent)

      Town.should_receive(:by_ikariam_id).with(82966).and_return(@town)
      Player.should_receive(:by_ikariam_id).with(57667).and_return(@player)

      expects(@town, { :name => 'Mobotropolis'})
      @town.should_receive(:save!)
      @player.should_receive(:save!)

      PlayerEvent.should_receive(:new).and_return(@player_event)
      expects(@player_event,
              { :player => @player, :available_ships => 42,
                :ships => 42, :gold => 4615})
      @player_event.should_receive(:save!)

      TownEvent.should_receive(:new).and_return(@town_event)
      expects(@town_event,
              { :town => @town, :wood => 25200,
                :wine => 4000, :marble => 4946,
                :crystal => 9385, :sulphur => 36,
                :population => 1541,
                :available_mans => 1045})
      @town_event.should_receive(:save!)

      do_scrape_menu_only :view_city
    end

    it "should not crash when receiving a blank ikariam_url" do
      post :scree, {:ikariam_page => "", :ikariam_url => ""}
    end
  end
end

