class Player < ActiveRecord::Base
  validates_presence_of :server #, :ikariam_id
#  validates_uniqueness_of :ikariam_id

  has_many :player_events

  belongs_to :user

  belongs_to :server

  acts_as_ikariam

  def self.by_ikariam_login(server, ikariam_login)
    already_exists = self.find(:first, :conditions => ["ikariam_login = ? AND server_id = ?", ikariam_login, server.id])
    if already_exists.nil?
      new_town = self.new
      new_town.ikariam_id = ikariam_id
      return new_town
    else
      return already_exists
    end
  end
end
