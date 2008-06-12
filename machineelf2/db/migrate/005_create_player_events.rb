class CreatePlayerEvents < ActiveRecord::Migration
  def self.up
    create_table :player_events do |t|
      t.integer :player_id
      t.integer :ships_in_transit
      t.integer :income
      t.integer :ships
      t.integer :gold

      t.timestamps
    end
  end

  def self.down
    drop_table :player_events
  end
end
