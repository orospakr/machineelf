class Town < ActiveRecord::Base
  # Represents the immutable aspects of a given Ikariam town,
  # like parent island, owner, position, and resource.

  # An associated TownDataPoint table represents the transient,
  # mutable values.

  belongs_to :server

  belongs_to :island

  belongs_to :player, :foreign_key => 'owner_id'

  has_many :town_events

  has_many :buildings

  validates_presence_of :ikariam_id, :name, :server
  validates_uniqueness_of :ikariam_id

  acts_as_ikariam

  def get_most_recent_event_value(column)
    events = TownEvent.find(:all, :conditions => ['town_id = ?', self.id], :order => 'created_at DESC')
    events.each do |event|
      val = event.send(column)
      if !val.nil?
        return val
      end
    end
    print "Couldn't find the newest " + column.to_s + " for Town with id #" + self.id.to_s + '\n'
    return nil
  end

  def public_url
    if island.nil?
      return nil
    end
    return "http://#{server.hostname}/index.php?view=island&id=#{island.ikariam_id}&selectCity=#{ikariam_id}"
  end

  def url
    return "http://#{server.hostname}/index.php?view=city&id=#{ikariam_id}"
  end

  def current_stats
    should_not_get = [:id, :created_at, :town_id]
    results = { }
    resources = { }
    #    pp TownEvent.columns
    TownEvent.columns.each do |col|
      if should_not_get.include?(col.name.intern)
        next
      end
      resources[col.name.intern] = get_most_recent_event_value(col.name)
    end
    results[:resources] = resources
    # breaking the usual RESTful paradigm here and including the building
    # status data here too, for convenience.  Toolbar doesn't need to know
    # about the separate building/buildingevent objects, either, and there's no
    # point in having it roundtrip to /buildings/:id.json anyway.
    bdings = { }
    buildings.each do |building|
      bdings[building.flavour.intern] = building.current_stats
    end
    results[:buildings] = bdings
    return results
  end

  def Town.remaining_finished_at(remaining)
    segments = remaining.split(' ')
    time_now = Time.now
    for seg in segments
      units = seg[0..-2]
      metric = seg[-1].chr
      if metric == "m"
        time_now += units.to_i.minutes
      elsif metric == "s"
        time_now += units.to_i.seconds
      elsif metric == "h"
        time_now += units.to_i.hours
      end
    end
    return time_now
  end

  def building_by_flavour(flavour)
    existing_building = Building.find(:first, :conditions => ["flavour = ? AND town_id = ?", flavour, self.id])
    if !existing_building.nil?
      return existing_building
    end
    new_building = Building.new()
    new_building.flavour = flavour
    new_building.town = self
    return new_building
  end
end
