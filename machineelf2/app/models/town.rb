class Town < ActiveRecord::Base
  # Represents the immutable aspects of a given Ikariam town,
  # like parent island, owner, position, and resource.

  # An associated TownDataPoint table represents the transient,
  # mutable values.

  validates_presence_of :ikariam_id, :name
  validates_uniqueness_of :ikariam_id
end
