class Player < ActiveRecord::Base
  validates_presence_of :ikariam_id
  validates_uniqueness_of :ikariam_id

  has_many :player_events

  belongs_to :user

  acts_as_ikariam
end
