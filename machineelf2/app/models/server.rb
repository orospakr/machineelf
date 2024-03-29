class Server < ActiveRecord::Base
  validates_presence_of :name, :hostname

  has_many :towns

  def self.by_hostname(hostname)
    return self.find(:first, :conditions => ['hostname = ?', hostname])
  end
end
