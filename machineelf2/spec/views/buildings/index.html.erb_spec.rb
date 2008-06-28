require File.dirname(__FILE__) + '/../../spec_helper'

describe "/buildings/index.html.erb" do
  include BuildingsHelper
  
  before(:each) do
    building_98 = mock_model(Building)
    building_98.should_receive(:flavour).and_return("MyString")
    building_98.should_receive(:ready_at).and_return(Time.now)
    building_98.should_receive(:town_id).and_return("1")
    building_99 = mock_model(Building)
    building_99.should_receive(:flavour).and_return("MyString")
    building_99.should_receive(:ready_at).and_return(Time.now)
    building_99.should_receive(:town_id).and_return("1")

    assigns[:buildings] = [building_98, building_99]
  end

  it "should render list of buildings" do
    render "/buildings/index.html.erb"
    response.should have_tag("tr>td", "MyString", 2)
  end
end

