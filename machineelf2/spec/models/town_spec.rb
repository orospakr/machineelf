require File.dirname(__FILE__) + '/../spec_helper'

describe Town do
  fixtures :towns

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

  it "should return a new town if asked for one with a new Ikariam town id" do
    nowhere = Town.by_ikariam_id(12345)
    nowhere.new_record?.should be_true
    nowhere.ikariam_id.should == 12345
    nowhere.name.should be_nil
  end

  it "should return a new town if asked for one with an Ikariam town id that already exists in the system" do
    knothole = Town.by_ikariam_id(towns(:knothole).ikariam_id)
    knothole.name.should == "Knothole"
  end
end

