class Building < ActiveRecord::Base
  belongs_to :town

  has_many :building_events

  validates_presence_of :town, :flavour

  def write_event(level)
    building_event = BuildingEvent.new
    building_event.building = self
    building_event.level = level
    building_event.save!
  end
end
