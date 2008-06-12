class Player < ActiveRecord::Base
  validates_presence_of :ikariam_id
  validates_uniqueness_of :ikariam_id

  acts_as_ikariam
end
