class PlayerEvent < ActiveRecord::Base
  belongs_to :player

  validates_presence_of :player_id
end
