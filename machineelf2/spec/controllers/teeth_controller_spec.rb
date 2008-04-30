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
      "http://s3.ikariam.org/index.php?view=city&id=82966"
    end

    def expects(model, expectations)
      expectations.each_pair do |field, val|
        model.should_receive("#{field.to_s}=".intern).with(val)
      end
    end

    def do_scrape_page_fixture(page_name)
      post :scree, {:ikariam_page => ikariam_page(page_name), :ikariam_url => ikariam_url(page_name)}
    end

    before(:each) do
      @town = mock_model(Town)
      Town.stub!(:by_ikariam_id).and_return(@town)
    end

    it "should munch a view_city page" do
      expects(@town, { :name => 'Mobotropolis'})
      @town.should_receive(:save!)
      do_scrape_page_fixture :view_city
      # OK, andrew start here!  You need to write a separate set of methods
      # that parse the ever-present ikariam top-bar.  The new city page
      # is really only good for getting island coordinates, which we might as well
      # do here (are those figures even available anywhere else, except for
      # home secretary?)
    end
    
    it "should not crash when receiving a blank ikariam_url" do
      post :scree, {:ikariam_page => "", :ikariam_url => ""}
    end

  end
end
