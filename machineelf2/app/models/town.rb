class Town < ActiveRecord::Base
  acts_as_versioned

  def self.by_ikariam_id(ikariam_id)
    already_exists = Town.find(:first, :conditions => ["ikariam_id = ?", ikariam_id])
    if already_exists.nil?
      return Town.new
    else
      return already_exists
    end
  end
end
