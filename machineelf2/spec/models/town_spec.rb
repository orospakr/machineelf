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

  it "should be valid if it has an ikariam id, server, and name, that does not already exist in the database" do
    gamma = mock_model(Server)
    @town.ikariam_id = 9999
    @town.server = gamma
    @town.name = 'Not Mobotropolis'
    @town.should be_valid
  end

  it "should not be valid if it specifies a town that already exists" do
    @town.ikariam_id = towns(:mobotropolis).ikariam_id
    @town.name = "Should not matter what the name is"
    @town.should_not be_valid
  end

  it "should not be valid if it doesn't specify a server" do
    @town.ikariam_id = 9999
    @town.name = 'Not Mobotropolis'
    @town.should_not be_valid # lulz... I have had a should where I should have had a should not.  Durr.
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
    mobo.get_most_recent_event_value("wood").should == 9001
  end

  it "should return the most recent stats from the Town event table" do
    mobo = towns(:mobotropolis)

    expected = { :wood => 9001, :wine => 9473, :sulphur => 4567, :marble => 4568,
      :crystal => 5252, :population_capacity => 1000, :population => 900,
      :available_mans => 200 }

    mobo.get_stats.should == expected
  end

    describe "should calculate the time of completion from the remaining time value" do
    before :each do
      @now_time = Time.parse("Sat Jun 28 16:29:14 -0400 2008")
      Time.stub!(:now).and_return(@now_time)
    end

    it "for 10m 30s" do
      expected_time = @now_time + 10.minutes + 30.seconds
      Town.remaining_finished_at("10m 30s").should == expected_time
    end

    it "for 5h 10m" do
      expected_time = @now_time + 5.hours + 10.minutes
      Town.remaining_finished_at("5h 10m").should == expected_time
    end
  end

end
