require File.dirname(__FILE__) + '/../../spec_helper'

describe "/towns/show.html.erb" do
  include TownsHelper

  before(:each) do
    @town = mock_model(Town)
    @town.stub!(:island_id).and_return("1")
    @town.stub!(:updated_at).and_return(Time.now)
    @town.stub!(:name).and_return("MyString")
    @town.stub!(:owner_id).and_return("1")

    assigns[:town] = @town
  end

  it "should render attributes in <p>" do
    render "/towns/show.html.erb"
    response.should have_text(/MyString/)
    response.should have_text(/1/)
    response.should have_text(/1/)
    response.should have_text(/1/)
    response.should have_text(/1/)
    response.should have_text(/1/)
    response.should have_text(/1/)
  end
end

