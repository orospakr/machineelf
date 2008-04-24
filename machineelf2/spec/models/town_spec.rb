require File.dirname(__FILE__) + '/../spec_helper'

describe Town do
  before(:each) do
    @town = Town.new
  end

  it "should be valid" do
    @town.should be_valid
  end

  it "should have the ActsAsVersioned working" do
    @town.name = "Hi!"
    @town.save!
    @town.version.should == 1
    @town.name = "LULZ"
    @town.save!
    @town.version.should == 2
    
    @town.name = "butts"
    @town.save!
    @town.version.should == 3
  end
end
