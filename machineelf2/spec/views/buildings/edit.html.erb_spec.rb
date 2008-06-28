require File.dirname(__FILE__) + '/../../spec_helper'

describe "/buildings/edit.html.erb" do
  include BuildingsHelper
  
  before do
    @building = mock_model(Building)
    @building.stub!(:flavour).and_return("MyString")
    @building.stub!(:ready_at).and_return(Time.now)
    @building.stub!(:town_id).and_return("1")
    assigns[:building] = @building
  end

  it "should render edit form" do
    render "/buildings/edit.html.erb"
    
    response.should have_tag("form[action=#{building_path(@building)}][method=post]") do
      with_tag('input#building_flavour[name=?]', "building[flavour]")
    end
  end
end


