require File.dirname(__FILE__) + '/../../spec_helper'

describe "/islands/show.html.erb" do
  include IslandsHelper

  before(:each) do
    @island = mock_model(Island)
    @island.stub!(:ikariam_id).and_return("1")
    @island.stub!(:name).and_return("MyString")
    @island.stub!(:x).and_return(73)
    @island.stub!(:y).and_return(90)

    assigns[:island] = @island
  end

  it "should render attributes in <p>" do
    render "/islands/show.html.erb"
    response.should have_text(/MyString/)
  end
end

