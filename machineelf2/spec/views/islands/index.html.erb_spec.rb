require File.dirname(__FILE__) + '/../../spec_helper'

describe "/islands/index.html.erb" do
  include IslandsHelper

  before(:each) do
    island_98 = mock_model(Island)
    island_98.should_receive(:ikariam_id).and_return("1")
    island_98.should_receive(:name).and_return("MyString")
    island_98.should_receive(:x).and_return(33)
    island_98.should_receive(:y).and_return(86)
    island_99 = mock_model(Island)
    island_99.should_receive(:ikariam_id).and_return("1")
    island_99.should_receive(:name).and_return("MyString")
    island_99.should_receive(:x).and_return(33)
    island_99.should_receive(:y).and_return(86)

    assigns[:islands] = [island_98, island_99]
  end

  it "should render list of islands" do
    render "/islands/index.html.erb"
    response.should have_tag("tr>td", "MyString", 2)
  end
end

