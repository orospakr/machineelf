class CreateTownEvents < ActiveRecord::Migration
  def self.up
    create_table :town_events do |t|
      t.integer :town_id

      # resources
      t.integer :wood
      t.integer :wine
      t.integer :marble
      t.integer :crystal
      t.integer :sulphur
      # total number of people this island can hold
      t.integer :population_capacity
      # total island population
      t.integer :population
      # people only earning gold, not resources/military
      t.integer :available_mans

      t.datetime :created_at
    end
  end

  def self.down
    drop_table :town_events
  end
end
