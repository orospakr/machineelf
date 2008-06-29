class BuildingEvent < ActiveRecord::Base
  belongs_to :building
  validates_presence_of :building
end
