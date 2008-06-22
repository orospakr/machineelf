require File.dirname(__FILE__) + '/../../spec_helper'

describe "/islands/new.html.erb" do
  include IslandsHelper
  
  before(:each) do
    @island = mock_model(Island)
    @island.stub!(:new_record?).and_return(true)
    @island.stub!(:ikariam_id).and_return("1")
    @island.stub!(:name).and_return("MyString")
    assigns[:island] = @island
  end

  it "should render new form" do
    render "/islands/new.html.erb"
    
    response.should have_tag("form[action=?][method=post]", islands_path) do
      with_tag("input#island_name[name=?]", "island[name]")
    end
  end
end


