require File.dirname(__FILE__) + '/../spec_helper'

describe Island do
  fixtures :islands

  before(:each) do
    @island = Island.new
  end

  it "should not be valid if blank" do
    @island.should_not be_valid
  end

  it "should be valid if it has an ikariam id, and a name, that does not already exist in the database " do
    @island.ikariam_id = 4754325643
    @island.name = "should not matter"
    @island.should be_valid
  end

  it "should not be valid if it specifies an island that already exists" do
    @island.ikariam_id = islands(:issayos).ikariam_id
    @island.name = "also should not matter"
    @island.should_not be_valid
  end

  it "should return a new island if asked for one with a new Ikariam island id" do
    nowhere = Island.by_ikariam_id(12345)
    nowhere.new_record?.should be_true
    nowhere.ikariam_id.should == 12345
    nowhere.name.should be_nil
  end

  it "should return an existing island if asked for one with an existing Ikariam town id" do
    issa = Island.by_ikariam_id(islands(:issayos).ikariam_id)
    issa.id.should == islands(:issayos).id
    issa.new_record?.should_not be_true
  end
end
