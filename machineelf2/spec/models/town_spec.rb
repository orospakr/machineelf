require File.dirname(__FILE__) + '/../spec_helper'

describe Town do
  fixtures :towns
  fixtures :town_events
  fixtures :buildings
  fixtures :building_events
  fixtures :servers

  before(:each) do
    @town = Town.new
  end

  it "should not be valid if blank" do
    @town.should_not be_valid
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

  describe "for a given server" do
    before :each do
      @server = mock_model(Server)
      @gamma = servers(:gamma)
    end

    it "should return a new town if asked for one with a new Ikariam town id" do
      nowhere = Town.by_ikariam_id(@gamma, 12345)
      nowhere.new_record?.should be_true
      nowhere.ikariam_id.should == 12345
      nowhere.name.should be_nil
    end

    it "should return an existing town if asked for one with an existing Ikariam town id" do
      mobo = Town.by_ikariam_id(@gamma, towns(:mobotropolis).ikariam_id)
      mobo.id.should == towns(:mobotropolis).id
      mobo.new_record?.should_not be_true
    end

    it "should NOT return a town that exists on another server" do
      # start here!
      # add new fixtures!
      mobo = Town.by_ikariam_id(@gamma, towns(:alphaopolis))
      mobo.id.should_not == towns(:alphaopolis).id
    end
  end

  describe "a valid town" do
    before :each do
      @town = Town.new
      @gamma = mock_model(Server)
      @town.ikariam_id = 9999
      @town.server = @gamma
      @town.name = 'Not Mobotropolis'
    end

    it "is valid when it has all of the required fields" do
      @town.should be_valid
    end

    it "should return the an existing building by flavour" do
      @tavern = mock_model(Building)
      Building.should_receive(:find).with(:first, :conditions => ["flavour = ? AND town_id = ?", 'tavern', @town.id]).and_return(@tavern)
      @town.building_by_flavour('tavern').should == @tavern
    end

    it "should return a new building by flavour" do
      @museum = mock_model(Building)
      Building.should_receive(:find).with(:first, :conditions => ["flavour = ? AND town_id = ?", 'museum', @town.id]).and_return(nil)
      Building.should_receive(:new).and_return(@museum)
      @museum.should_receive(:town=).with(@town)
      @museum.should_receive(:flavour=).with("museum")
      @town.building_by_flavour('museum').should == @museum
    end

    describe "when saved" do
      before :each do
        @island = mock_model(Island)

        @gamma.should_receive(:hostname).and_return('s3.ikariam.org')
        @town.island = @island
        @town.save!
      end

      describe "it should provide a URL" do
        it "to the island with town highlighted for public users" do
          @island.should_receive(:ikariam_id).and_return(7694)
          @town.public_url.should == "http://s3.ikariam.org/index.php?view=island&id=7694&selectCity=9999"
        end

        it "to the town for use for the owner or spy users" do
          @town.url.should == "http://s3.ikariam.org/index.php?view=city&id=9999"\
        end
      end
    end
  end

  it "should return the most recent value for a given Event column" do
    mobo = towns(:mobotropolis)
    mobo.get_most_recent_event_value("wood").should == 9001
  end

  it "should return the most recent stats from the Town event table, as well as building stats" do
    mobo = towns(:mobotropolis)
    mobo_tavern = buildings(:mobo_tavern)
    mobo_tavern.town.should == mobo
    expected = { :resources => { :wood => 9001, :wine => 9473, :sulphur => 4567, :marble => 4568,
      :crystal => 5252, :population_capacity => 1000, :population => 900,
        :available_mans => 200 }, :buildings => { :tavern => { :level => 15}}}

    mobo.current_stats.should == expected
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
