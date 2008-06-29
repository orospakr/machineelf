class TownEvent < ActiveRecord::Base
  belongs_to :town

  validates_presence_of :town
end
