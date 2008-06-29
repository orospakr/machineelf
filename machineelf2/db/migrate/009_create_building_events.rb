class CreateBuildingEvents < ActiveRecord::Migration
  def self.up
    create_table :building_events do |t|
      t.integer :building_id
      t.integer :level
      t.timestamps
    end
  end

  def self.down
    drop_table :building_events
  end
end
