require File.dirname(__FILE__) + '/../../spec_helper'

describe "/buildings/show.html.erb" do
  include BuildingsHelper
  
  before(:each) do
    @building = mock_model(Building)
    @building.stub!(:flavour).and_return("MyString")
    @building.stub!(:ready_at).and_return(Time.now)
    @building.stub!(:town_id).and_return("1")

    assigns[:building] = @building
  end

  it "should render attributes in <p>" do
    render "/buildings/show.html.erb"
    response.should have_text(/MyString/)
  end
end

