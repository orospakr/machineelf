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

    it "should munch a view_city page" do
      @town = mock_model(Town)
      @island = mock_model(Island)
      Town.should_receive(:by_ikariam_id).with(82966).and_return(@town)
      Island.should_receive(:by_ikariam_id).with(3909).and_return(@island)
      @town.should_receive(:island=).with(@island)
      @town.should_receive(:save!)
      @island.should_receive(:save!)

      expects(@town, { :name => 'Mobotropolis' })
      expects(@island, { :name => 'Issayos'})

      do_scrape_contents_only :view_city
      # OK, andrew start here!  You need to write a separate set of methods
      # that parse the ever-present ikariam top-bar.  The new city page
      # is really only good for getting island coordinates, which we might as well
      # do here (are those figures even available anywhere else, except for
      # home secretary?)
    end

#     it "should ignore a city on the Town bar if the island does not exist yet (a view_city needs to be seen)" do
#       # just 'cause there's not enough information yet to be validate a single record.
#     end

#     describe "ikariam town bar munching for all pages" do
#       it "should munch the ikariam town bar on view_city page" do
#         expects(@town, { :name => 'Mobotropolis'})
#         @town.should_receive(:save!)
#         do_scrape_page_fixture :view_city
#       end
#     end

    it "should much a view_city's page toolbar" do
      @towm = mock_model(Town)
      Town.should_receive(:by_ikariam_id).with(82966).and_return(@town)
      expects(@town, { :name => 'Mobotropolis'})
      do_scrape_menu_only :view_city
    end

    it "should not crash when receiving a blank ikariam_url" do
      post :scree, {:ikariam_page => "", :ikariam_url => ""}
    end
  end
end

