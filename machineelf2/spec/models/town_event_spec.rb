require File.dirname(__FILE__) + '/../spec_helper'

describe TownEvent do
  before(:each) do
    @town_event = TownEvent.new
  end

  it "should not be valid when blank" do
    @town_event.should_not be_valid
  end

  it "should be valid" do
    t = mock_model(Town)
    @town_event.town = t
    @town_event.should be_valid
  end
end
