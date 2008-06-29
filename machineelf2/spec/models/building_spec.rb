require File.dirname(__FILE__) + '/../spec_helper'

describe Building do
  before(:each) do
    @building = Building.new
    @town = mock_model(Town)
  end

  it "should NOT be valid if blank" do
    @building.should_not be_valid
  end

  it "should be valid if it has an parent town and a flavour" do
    @building.town = @town
    @building.flavour = "town_hall"
    @building.should be_valid
  end

  it "should create a new BuildingEvent with appropriate building_id and level" do
    @building.town = @town
    @building.flavour = "town_hall"
    @building_event = mock_model(BuildingEvent)
    BuildingEvent.should_receive(:new).and_return(@building_event)
    @building_event.should_receive(:building=).with(@building)
    @building_event.should_receive(:level=).with(42)
    @building_event.should_receive(:save!)
    @building.write_event(42)
  end
end
