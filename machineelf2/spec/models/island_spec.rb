require File.dirname(__FILE__) + '/../spec_helper'

describe Island do
  before(:each) do
    @island = Island.new
  end

  it "should be valid" do
    @island.should be_valid
  end
end
