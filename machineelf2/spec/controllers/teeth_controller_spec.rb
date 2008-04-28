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
    end

    def expects(model, expectations)
      expectations.each_pair do |field, val|
        model.should_receive("#{field}=".intern).with(val)
      end
    end

    def do_scrape_page_fixture(page_name)
      post :scree, {:ikariam_page => ikariam_page(page_name), :ikariam_url => ikariam_url(page_name)}
    end

    before(:each) do
      @town = mock_model(Town)
      Town.stub!(:by_ikariam_id).and_return(@town)
    end

    it "should munch orospakr's town page" do
      expects(@town, { 'name', 'Knothole'})
      do_scrape_page_fixture :embassy
      # @town.name = "Knothole"
    end

  end
end
