require File.dirname(__FILE__) + '/../spec_helper'

describe PlayerEvent do
  before(:each) do
    @player_event = PlayerEvent.new
  end

  it "should not be valid when blank" do
    @player_event.should_not be_valid
  end

  it "should be valid" do
    p = mock_model(Player)
    @player_event.player = p
    @player_event.should be_valid
  end
end
