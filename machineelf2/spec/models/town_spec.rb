require File.dirname(__FILE__) + '/../spec_helper'

describe Town do
  fixtures :towns

  before(:each) do
    @town = Town.new
  end

  it "should not be valid if blank" do
    @town.should_not be_valid
  end

  it "should be valid if it has an ikariam id, and name, that does not already exist in the database" do
    @town.ikariam_id = 9999
    @town.name = 'Not Mobotropolis'
    @town.should be_valid
  end

  it "should not be valid if it specifies a town that already exists" do
    @town.ikariam_id = towns(:mobotropolis).ikariam_id
    @town.name = "Should not matter what the name is"
    @town.should_not be_valid
  end

  it "should return a new town if asked for one with a new Ikariam town id" do
    nowhere = Town.by_ikariam_id(12345)
    nowhere.new_record?.should be_true
    nowhere.ikariam_id.should == 12345
    nowhere.name.should be_nil
  end

  it "should return an existing town if asked for one with an existing Ikariam town id" do
    mobo = Town.by_ikariam_id(towns(:mobotropolis).ikariam_id)
    mobo.id.should == towns(:mobotropolis).id
    mobo.new_record?.should_not be_true
  end
end
