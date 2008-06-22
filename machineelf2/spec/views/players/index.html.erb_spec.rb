require File.dirname(__FILE__) + '/../../spec_helper'

describe "/players/index.html.erb" do
  include PlayersHelper
  
  before(:each) do
    player_98 = mock_model(Player)
    player_98.should_receive(:ikariam_id).and_return("1")
    player_98.should_receive(:ikariam_login).and_return("MyString")
    player_99 = mock_model(Player)
    player_99.should_receive(:ikariam_id).and_return("1")
    player_99.should_receive(:ikariam_login).and_return("MyString")

    assigns[:players] = [player_98, player_99]
  end

  it "should render list of players" do
    render "/players/index.html.erb"
    response.should have_tag("tr>td", "MyString", 2)
  end
end

