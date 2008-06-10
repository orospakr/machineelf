class Town < ActiveRecord::Base
  # Represents the immutable aspects of a given Ikariam town,
  # like parent island, owner, position, and resource.

  # An associated TownDataPoint table represents the transient,
  # mutable values.

  validates_presence_of :ikariam_id, :name
  validates_uniqueness_of :ikariam_id

  def self.by_ikariam_id(ikariam_id)
    already_exists = Town.find(:first, :conditions => ["ikariam_id = ?", ikariam_id])
    if already_exists.nil?
      new_town = Town.new
      new_town.ikariam_id = ikariam_id
      return new_town
    else
      return already_exists
    end
  end

end
