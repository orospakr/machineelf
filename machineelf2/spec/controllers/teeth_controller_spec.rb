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

    def expects(model, expectations)
      expectations.each_pair do |field, val|
        model.should_receive("#{field.to_s}=".intern).with(val)
      end
    end

    def do_scrape_page_fixture(page_name)
      post :scree, {:ikariam_page => ikariam_page(page_name), :ikariam_url => ikariam_url(page_name)}
    end

    def do_scrape_contents_only(page_name)
      post :scree_contents, {:ikariam_page => ikariam_page(page_name), :ikariam_url => ikariam_url(page_name)}
    end

    def do_scrape_menu_only(page_name)
      post :scree_menu, {:ikariam_page => ikariam_page(page_name), :ikariam_url => ikariam_url(page_name)}
    end

    before(:each) do

    end

    it "should munch a view_city with a new Town and Island that are not already in the database" do
      @town = mock_model(Town)
      @island = mock_model(Island)

      Town.should_receive(:by_ikariam_id).with(82966).and_return(@town)
      Island.should_receive(:by_ikariam_id).with(3909).and_return(@island)

      @town.should_receive(:save!)
      @island.should_receive(:save!)

      expects(@town, { :name => 'Mobotropolis', :island => @island })
      expects(@island, { :name => 'Issayos'})

      # now to test data point creation...

      @town_event = mock_model(TownEvent)


      do_scrape_contents_only :view_city

    end

    it "should much a view_city's page toolbar" do
      @towm = mock_model(Town)
      Town.should_receive(:by_ikariam_id).with(82966).and_return(@town)
      expects(@town, { :name => 'Mobotropolis'})

      TownEvent.should_receive(:new).and_return(@town_event)
      expects(@town_event,
              { :town => @town, :wood => 25200,
                :wine => 4000, :marble => 4946,
                :crystal => 9385, :sulphur => 36})
      @town_event.should_receive(:save!)

      do_scrape_menu_only :view_city
    end

    it "should not crash when receiving a blank ikariam_url" do
      post :scree, {:ikariam_page => "", :ikariam_url => ""}
    end
  end
end

