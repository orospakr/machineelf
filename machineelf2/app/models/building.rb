class Building < ActiveRecord::Base
  @@building_types_hash = { 'Town hall' => :town_hall,
    'Trading port' => :trading_port,
    'Shipyard' => :shipyard, 'Tavern' => :tavern,
    'Barracks' => :barracks, 'Academy' => :academy,
    'Warehouse' => :warehouse, 'Hideout' => :hideout,
    'Museum' => :museum, 'Trading post' => :trading_post,
    'Embassy' => :embassy, 'Palace' => :palace,
    'Town wall' => :town_wall, "Workshop" => :workshop}
  def Building.building_types; @@building_types_hash end

  belongs_to :town

  has_many :building_events

  validates_presence_of :town, :flavour

  def write_event(level)
    building_event = BuildingEvent.new
    building_event.building = self
    building_event.level = level
    building_event.save!
  end

  # argh, get_most_recent_event_value and current_stats are almost identical with
  # the ones in Town.  needs refactoring, somehow.

  def get_most_recent_event_value(column)
    events = BuildingEvent.find(:all, :conditions => ['building_id = ?', self.id], :order => 'created_at DESC')
    events.each do |event|
      val = event.send(column)
      if !val.nil?
        return val
      end
    end
    print "Couldn't find the newest " + column.to_s + " for Building with id #" + self.id.to_s + '\n'
    return nil
  end

  def current_stats
    should_not_get = [:id, :created_at, :building_id]
    results = { }
    BuildingEvent.columns.each do |col|
      if should_not_get.include?(col.name.intern)
        next
      end
      results[col.name.intern] = get_most_recent_event_value(col.name)
    end
    return results
  end
end
