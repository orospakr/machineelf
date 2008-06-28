class CreateBuildings < ActiveRecord::Migration
  def self.up
    create_table :buildings do |t|
      t.string :flavour
      t.datetime :ready_at
      t.integer :town_id

      t.timestamps
    end
  end

  def self.down
    drop_table :buildings
  end
end
