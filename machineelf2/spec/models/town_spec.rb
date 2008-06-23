require File.dirname(__FILE__) + '/../spec_helper'

describe Town do
  fixtures :towns
  fixtures :town_events

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

  it "should return the most recent value for a given Event column" do
    mobo = towns(:mobotropolis)
    mobo.get_most_recent_event_value("town_hall").should == 12
  end

  it "should return the most recent stats from the Town event table" do
    mobo = towns(:mobotropolis)

    expected = { :wood => 9001, :wine => 9473, :sulphur => 4567, :marble => 4568,
    :crystal => 5252, :population_capacity => 1000, :population => 900,
    :available_mans => 200, :town_hall => 12, :trading_port => 3, :shipyard => 4,
    :tavern => 15, :barracks => 7, :academy => 14, :warehouse => 10,
    :hideout => 2, :museum => 9, :trading_post => 4, :embassy => 1,
    :palace => 3, :town_wall => 5}

    mobo.get_stats.should == expected
  end

end
