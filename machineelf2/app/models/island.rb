class Island < ActiveRecord::Base
  validates_presence_of :ikariam_id, :name, :server
  validates_uniqueness_of :ikariam_id

  has_many :towns

  belongs_to :server

  acts_as_ikariam
end
