require File.dirname(__FILE__) + '/../../spec_helper'

describe "/buildings/new.html.erb" do
  include BuildingsHelper
  
  before(:each) do
    @building = mock_model(Building)
    @building.stub!(:new_record?).and_return(true)
    @building.stub!(:flavour).and_return("MyString")
    @building.stub!(:ready_at).and_return(Time.now)
    @building.stub!(:town_id).and_return("1")
    assigns[:building] = @building
  end

  it "should render new form" do
    render "/buildings/new.html.erb"
    
    response.should have_tag("form[action=?][method=post]", buildings_path) do
      with_tag("input#building_flavour[name=?]", "building[flavour]")
    end
  end
end


