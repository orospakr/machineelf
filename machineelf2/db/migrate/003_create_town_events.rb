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

      # building levels
      t.integer :town_hall
      t.integer :trading_port
      t.integer :shipyard
      t.integer :tavern
      t.integer :barracks
      t.integer :academy
      t.integer :warehouse
      t.integer :hideout
      t.integer :museum
      t.integer :trading_post
      t.integer :embassy
      t.integer :palace
      t.integer :town_wall
      t.integer :workshop

      # remaining build times, if build in progress
      t.integer :town_hall_remaining
      t.integer :trading_port_remaining
      t.integer :shipyard_remaining
      t.integer :tavern_remaining
      t.integer :barracks_remaining
      t.integer :academy_remaining
      t.integer :warehouse_remaining
      t.integer :hideout_remaining
      t.integer :museum_remaining
      t.integer :trading_post_remaining
      t.integer :embassy_remaining
      t.integer :palace_remaining
      t.integer :town_wall_remaining
      t.integer :workshop_remaining

      t.datetime :created_at
    end
  end

  def self.down
    drop_table :town_events
  end
end
