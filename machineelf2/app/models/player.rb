class Player < ActiveRecord::Base
  validates_presence_of :ikariam_id
  validates_uniqueness_of :ikariam_id


  def self.by_ikariam_id(ikariam_id)
    already_exists = Player.find(:first, :conditions => ["ikariam_id = ?", ikariam_id])
    if already_exists.nil?
      new_town = Player.new
      new_town.ikariam_id = ikariam_id
      return new_town
    else
      return already_exists
    end
  end
end
