require File.dirname(__FILE__) + '/../spec_helper'

describe Building do
  fixtures :buildings
  fixtures :building_events

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

  it "should return the most recent value for a given Event column" do
    mobo_tavern = buildings(:mobo_tavern)
    mobo_tavern.get_most_recent_event_value("level").should == 15
  end

  it "should return the most recent stats from the Building event table" do
    mobo_tavern = buildings(:mobo_tavern)

    expected = { :level => 15 }

    mobo_tavern.current_stats.should == expected
  end
end
