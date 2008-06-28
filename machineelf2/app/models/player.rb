class Player < ActiveRecord::Base
  validates_presence_of :ikariam_id, :server
  validates_uniqueness_of :ikariam_id

  has_many :player_events

  belongs_to :user

  belongs_to :server

  acts_as_ikariam
end
