class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :player

  def to_label
    return player.to_label
  end

end
