class Player < ActiveRecord::Base
  belongs_to :server

  has_many :towns, :foreign_key => 'owner_id'

  validates_presence_of :server, :ikariam_login #, :ikariam_id
#  validates_uniqueness_of :ikariam_id

  has_many :player_events

  acts_as_ikariam

  def self.by_ikariam_login(server, ikariam_login)
    already_exists = self.find(:first, :conditions => ["ikariam_login = ? AND server_id = ?", ikariam_login, server.id])
    if already_exists.nil?
      new_town = self.new
      new_town.server = server
      new_town.ikariam_login = ikariam_login
      return new_town
    else
      return already_exists
    end
  end
end
