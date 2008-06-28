class Town < ActiveRecord::Base
  # Represents the immutable aspects of a given Ikariam town,
  # like parent island, owner, position, and resource.

  # An associated TownDataPoint table represents the transient,
  # mutable values.

  belongs_to :server

  belongs_to :island

  belongs_to :player, :foreign_key => 'owner_id'

  has_many :town_events

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

  def get_stats
    should_not_get = [:id, :created_at, :town_id]
    results = { }
#    pp TownEvent.columns
    TownEvent.columns.each do |col|
      if should_not_get.include?(col.name.intern)
        next
      end
      results[col.name.intern] = get_most_recent_event_value(col.name)
    end
    return results
  end
end
