require File.dirname(__FILE__) + '/../spec_helper'

describe BuildingEvent do
  before(:each) do
    @building_event = BuildingEvent.new
  end

  it "should be NOT valid witout a building id" do
    @building_event.should_not be_valid
  end

  it "should be with only a building id" do
    @building_event.building = mock_model(Building)
    @building_event.should be_valid
  end
end
