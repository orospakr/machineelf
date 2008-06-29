require File.dirname(__FILE__) + '/../spec_helper'

require 'time'

describe TeethController do

  describe "should convert a number" do

    before :each do
      @teeth = TeethController.new
    end

    it "with no thousands seperator" do
      @teeth.parse_number("420").should == 420
    end

    it "with a thousands seperator" do
      @teeth.parse_number("1,879").should == 1879
    end

    it "with no thousands sepator, in 'k' notation" do
      @teeth.parse_number("420k").should == 420000
    end
  end


  describe "actual controller " do
    before :each do
      korps_person_logged_in
    end

    describe "receiving HTML uploads from Machine Elf Toolbar" do

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
        @server = mock_model(Server)

        Town.should_receive(:by_ikariam_id).with(82966).and_return(@town)
        Island.should_receive(:by_ikariam_id).with(3909).and_return(@island)
        Server.should_receive(:by_hostname).with('s3.ikariam.org').and_return(@server)

        @town.should_receive(:save!)
        @town.should_receive(:player).and_return(@player)
        expects(@town, { :name => 'Mobotropolis', :island => @island, :server => @server })

        expects(@island, { :name => 'Issayos', :server => @server})
        @island.should_receive(:save!)

        expects(@player, { :ikariam_login => 'orospakr', :server => @server})
        @player.should_receive(:save!)

        # now to test data point creation...

#         @town_event = mock_model(TownEvent)
#         TownEvent.should_receive(:new).and_return(@town_event)
#         Time.stub!(:now).and_return(Time.parse("Sun Jun 28 17:35:21 -0400 2008"))
#         expects(@town_event, { :town => @town,
#                   :town_hall => 17, :trading_port => 5,
#                   :shipyard => 2, :tavern => 11,
#                   :barracks => 4, :academy => 12,
#                   :warehouse => 13, :hideout => 5,
#                   :museum => 4, :trading_post => 6,
#                   :embassy => 1, :palace => 2,
#                   :town_wall => 8, :workshop => 1,
#                   :tavern_remaining => Time.parse("Sun Jun 29 05:03:21 -0400 2008")
        #                 })
        #         @town_event.should_receive(:save!)

        # these have to be ordered by their incidence in the view_city fixture file.
        # that's just the way it is (making this code not require ordering
        # is just a massive pain).
        expected_buildings = {  :town_hall => 17, :trading_port => 5,
          :shipyard => 2, :tavern => 11,
          :barracks => 4, :academy => 12,
          :warehouse => 13, :hideout => 5,
          :museum => 4, :trading_post => 6,
          :embassy => 1, :workshop => 1, :palace => 2,
          :town_wall => 8 }

        Time.stub!(:now).and_return(Time.parse("Sun Jun 28 17:35:21 -0400 2008"))

        b_events = []
        expected_buildings.each_pair do |flavour, level|
          building = mock_model(Building)
          building.stub!(:town).and_return(@town)
          @town.should_receive(:building_by_flavour).with(flavour.to_s).and_return(building)
          if flavour == :tavern
            building.should_receive(:ready_at=).with(Time.parse("Sun Jun 29 05:03:21 -0400 2008"))
          end
          building.should_receive(:save!)
          building.should_receive(:write_event).ordered.with(level)
        end

        do_scrape_contents_only :view_city
      end

      it "should munch a view_city's page toolbar" do
        @town = mock_model(Town)
        @player = mock_model(Player)
        @server = mock_model(Server)
        @town_event = mock_model(TownEvent)
        @player_event = mock_model(PlayerEvent)

        Server.should_receive(:by_hostname).with('s3.ikariam.org').and_return(@server)
        Town.should_receive(:by_ikariam_id).with(82966).and_return(@town)
        Player.should_receive(:by_ikariam_id).with(57667).and_return(@player)

        expects(@town, { :name => 'Mobotropolis', :player => @player,
                  :server => @server})
        expects(@player, { :server => @server})
        @town.should_receive(:save!)
        @player.should_receive(:save!)

        PlayerEvent.should_receive(:new).and_return(@player_event)
        expects(@player_event,
                { :player => @player, :available_ships => 0,
                  :ships => 56, :gold => 1274000})
        @player_event.should_receive(:save!)

        TownEvent.should_receive(:new).and_return(@town_event)
        expects(@town_event,
                { :town => @town, :wood => 40041,
                  :wine => 10976, :marble => 8208,
                  :crystal => 9385, :sulphur => 36,
                  :population => 1541,
                  :available_mans => 693})
        @town_event.should_receive(:save!)

        do_scrape_menu_only :view_city
      end

      it "should not crash when receiving a blank ikariam_url and ikariam_page" do
        Server.should_receive(:by_hostname).with(nil).and_return(nil)
        post :scree, {:ikariam_page => "", :ikariam_url => ""}
      end

      it "should not crash when receiving a request with NO ikariam_url and ikariam_page" do
        post :scree
      end
    end
  end
end
