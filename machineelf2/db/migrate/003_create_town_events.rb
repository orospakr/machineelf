class CreateTownEvents < ActiveRecord::Migration
  def self.up
    create_table :town_events do |t|
      t.integer :town_id
      t.integer :wood
      t.integer :wine
      t.integer :marble
      t.integer :crystal
      t.integer :sulphur

#      t.timestamps
      t.datetime :created_at
    end
  end

  def self.down
    drop_table :town_events
  end
end
