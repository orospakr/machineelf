require File.dirname(__FILE__) + '/../../spec_helper'

describe "/players/show.html.erb" do
  include PlayersHelper

  before(:each) do
    @player = mock_model(Player)
    @server = mock_model(Server)
    @server.stub!(:name).and_return("MyString")
    @player.stub!(:ikariam_id).and_return("1")
    @player.stub!(:server).and_return(@server)
    @player.stub!(:ikariam_login).and_return("MyString")

    assigns[:player] = @player
  end

  it "should render attributes in <p>" do
    render "/players/show.html.erb"
    response.should have_text(/MyString/)
  end
end

