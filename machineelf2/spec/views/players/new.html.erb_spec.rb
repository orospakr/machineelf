require File.dirname(__FILE__) + '/../../spec_helper'

describe "/players/new.html.erb" do
  include PlayersHelper

  before(:each) do
    @player = mock_model(Player)
    @server = mock_model(Server)
    @player.stub!(:new_record?).and_return(true)
    @player.stub!(:ikariam_id).and_return("1")
    @player.stub!(:server_id).and_return(@server.id)
    @player.stub!(:server).and_return(@server)
    @player.stub!(:ikariam_login).and_return("MyString")
    assigns[:player] = @player
  end

  it "should render new form" do
    render "/players/new.html.erb"

    response.should have_tag("form[action=?][method=post]", players_path) do
      with_tag("input#player_ikariam_login[name=?]", "player[ikariam_login]")
    end
  end
end


