class Town < ActiveRecord::Base
  # I'm taking a slightly different approach from usual here.
  # Because I'd like a single record to effectively represent
  # a single group of data points along a time domain, I only
  # want to describe what values a given point may have.  This
  # is necessary because a given Ikariam page view may only
  # render a certain subset of the total available values.
  # Thus, I want to be able to include the notion that each
  # value may or may not include data in a given record.

  # perhaps consider overriding `($val)=` as a convenience
  # method?  They would return whatever the most recent
  # acquisition of that value was.

  acts_as_versioned

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
