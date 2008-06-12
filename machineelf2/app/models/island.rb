class Island < ActiveRecord::Base
  validates_presence_of :ikariam_id, :name
  validates_uniqueness_of :ikariam_id

  acts_as_ikariam
end
