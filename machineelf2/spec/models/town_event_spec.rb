require File.dirname(__FILE__) + '/../spec_helper'

describe TownEvent do
  before(:each) do
    @town_event = TownEvent.new
  end

  it "should be valid" do
    @town_event.should be_valid
  end
end
