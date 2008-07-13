class RemoveUserFromPlayer < ActiveRecord::Migration
  def self.up
    remove_column :players, :user_id
  end

  def self.down
    add_column :players, :user_id, :integer, :null => true
  end
end
