require File.dirname(__FILE__) + '/../../spec_helper'

describe "/towns/new.html.erb" do
  include TownsHelper

  before(:each) do
    @town = mock_model(Town)
    @town.stub!(:ikariam_id).and_return(6748583)
    @town.stub!(:new_record?).and_return(true)
    @town.stub!(:island_id).and_return("1")
    @town.stub!(:server_id).and_return(675456)
    @town.stub!(:found_at).and_return(Time.now)
    @town.stub!(:server_id).and_return(7654)
    @town.stub!(:updated_at).and_return(Time.now)
    @town.stub!(:name).and_return("MyString")
    @town.stub!(:owner_id).and_return("1")
    @town.stub!(:wood).and_return("1")
    @town.stub!(:wine).and_return("1")
    @town.stub!(:marble).and_return("1")
    @town.stub!(:crystal).and_return("1")
    @town.stub!(:sulphur).and_return("1")
    @town.stub!(:version).and_return("1")
    assigns[:town] = @town
  end

  it "should render new form" do
    render "/towns/new.html.erb"

    response.should have_tag("form[action=?][method=post]", towns_path) do
      with_tag("input#town_name[name=?]", "town[name]")
      with_tag("input#town_wood[name=?]", "town[wood]")
      with_tag("input#town_wine[name=?]", "town[wine]")
      with_tag("input#town_marble[name=?]", "town[marble]")
      with_tag("input#town_crystal[name=?]", "town[crystal]")
      with_tag("input#town_sulphur[name=?]", "town[sulphur]")
      with_tag("input#town_version[name=?]", "town[version]")
    end
  end
end


