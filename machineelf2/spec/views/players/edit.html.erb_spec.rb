require File.dirname(__FILE__) + '/../../spec_helper'

describe "/players/edit.html.erb" do
  include PlayersHelper
  
  before do
    @player = mock_model(Player)
    @player.stub!(:ikariam_id).and_return("1")
    @player.stub!(:ikariam_login).and_return("MyString")
    assigns[:player] = @player
  end

  it "should render edit form" do
    render "/players/edit.html.erb"
    
    response.should have_tag("form[action=#{player_path(@player)}][method=post]") do
      with_tag('input#player_ikariam_login[name=?]', "player[ikariam_login]")
    end
  end
end


