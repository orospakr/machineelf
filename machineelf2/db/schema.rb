# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of ActiveRecord to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 5) do

  create_table "islands", :force => true do |t|
    t.integer  "ikariam_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "player_events", :force => true do |t|
    t.integer  "player_id"
    t.integer  "ships_in_transit"
    t.integer  "income"
    t.integer  "ships"
    t.integer  "gold"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "players", :force => true do |t|
    t.integer  "ikariam_id"
    t.string   "ikariam_login"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "town_events", :force => true do |t|
    t.integer  "town_id"
    t.integer  "wood"
    t.integer  "wine"
    t.integer  "marble"
    t.integer  "crystal"
    t.integer  "sulphur"
    t.integer  "population_capacity"
    t.integer  "population"
    t.integer  "available_mans"
    t.integer  "town_hall"
    t.integer  "trading_port"
    t.integer  "shipyard"
    t.integer  "tavern"
    t.integer  "barracks"
    t.integer  "academy"
    t.integer  "warehouse"
    t.integer  "hideout"
    t.integer  "museum"
    t.integer  "trading_post"
    t.integer  "embassy"
    t.integer  "palace"
    t.integer  "town_wall"
    t.datetime "created_at"
  end

  create_table "towns", :force => true do |t|
    t.integer  "island_id"
    t.integer  "ikariam_id"
    t.string   "name"
    t.integer  "owner_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
