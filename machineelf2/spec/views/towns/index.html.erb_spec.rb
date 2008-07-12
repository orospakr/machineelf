require File.dirname(__FILE__) + '/../../spec_helper'

describe "/towns/index.html.erb" do
  include TownsHelper

  before(:each) do
    town_98 = mock_model(Town)
    town_98.should_receive(:island_id).and_return("1")
    town_98s_player = mock_model(Player)
    town_98s_player.should_receive(:ikariam_login).and_return("joeblow")
    town_98s_island = mock_model(Island)
    town_98s_island.should_receive(:name).and_return("MyString")
    town_98.should_receive(:island).twice.and_return(town_98s_island)
    town_98.should_receive(:player).and_return(town_98s_player)
    town_98.should_receive(:updated_at).and_return(Time.now)
    town_98.should_receive(:name).and_return("MyString")
    town_98.should_receive(:owner_id).and_return("1")
    town_99 = mock_model(Town)
    town_99.should_receive(:island_id).and_return("1")
    town_99s_player = mock_model(Player)
    town_99s_player.should_receive(:ikariam_login).and_return("joeblow")
    town_99.should_receive(:player).and_return(town_99s_player)
    town_99s_island = mock_model(Island)
    town_99s_island.should_receive(:name).and_return("MyString")
    town_99.should_receive(:island).twice.and_return(town_99s_island)
    town_99.should_receive(:updated_at).and_return(Time.now)
    town_99.should_receive(:name).and_return("MyString")
    town_99.should_receive(:owner_id).and_return("1")

    assigns[:towns] = [town_98, town_99]
  end

  it "should render list of towns" do
    render "/towns/index.html.erb"
    response.should have_tag("tr>td", "MyString", 4)
    response.should have_tag("tr>td", "1", 2)
    response.should have_tag("tr>td", "1", 2)
    response.should have_tag("tr>td", "1", 2)
    response.should have_tag("tr>td", "1", 2)
    response.should have_tag("tr>td", "1", 2)
    response.should have_tag("tr>td", "1", 2)
  end
end

