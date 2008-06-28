require File.dirname(__FILE__) + '/../spec_helper'

describe BuildingEvent do
  before(:each) do
    @building_event = BuildingEvent.new
  end

  it "should be valid" do
    @building_event.should be_valid
  end
end
