require File.dirname(__FILE__) + '/../spec_helper'

describe Player do
  fixtures :players
  fixtures :servers

  before(:each) do
    @player = Player.new
    @server = mock_model(Server)
  end

  it "should not be valid if blank" do
    @player.should_not be_valid
  end

#   it "should not be valid if it specifies a person that already exists" do
#     @player.server = @server
#     @player.ikariam_id = players(:orospakr).ikariam_id
#     @player.should_not be_valid
#   end

  it "should return a new player if asked for one with a new Ikariam player id" do
    dude = Player.by_ikariam_id(players(:orospakr).ikariam_id)
    dude.server = @server
    dude.id.should == players(:orospakr).id
  end

  it "should return an existing player if asked for one by login name and server" do
    dude = Player.by_ikariam_login(players(:orospakr).server, players(:orospakr).ikariam_login)
    dude.id.should == players(:orospakr).id
  end
end
