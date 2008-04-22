require File.dirname(__FILE__) + '/../spec_helper'

describe Town do
  before(:each) do
    @town = Town.new
  end

  it "should be valid" do
    @town.should be_valid
  end
end
