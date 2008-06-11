require File.dirname(__FILE__) + '/../spec_helper'

describe PlayerEvent do
  before(:each) do
    @player_event = PlayerEvent.new
  end

  it "should be valid" do
    @player_event.should be_valid
  end
end
