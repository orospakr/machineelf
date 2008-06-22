require File.dirname(__FILE__) + '/../../spec_helper'

describe "/islands/edit.html.erb" do
  include IslandsHelper
  
  before do
    @island = mock_model(Island)
    @island.stub!(:ikariam_id).and_return("1")
    @island.stub!(:name).and_return("MyString")
    assigns[:island] = @island
  end

  it "should render edit form" do
    render "/islands/edit.html.erb"
    
    response.should have_tag("form[action=#{island_path(@island)}][method=post]") do
      with_tag('input#island_name[name=?]', "island[name]")
    end
  end
end


