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

ActiveRecord::Schema.define(:version => 9) do

  create_table "building_events", :force => true do |t|
    t.integer  "building_id"
    t.integer  "level"
    t.datetime "created_at"
  end

  create_table "buildings", :force => true do |t|
    t.string   "flavour"
    t.datetime "ready_at"
    t.integer  "town_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "islands", :force => true do |t|
    t.integer  "ikariam_id"
    t.integer  "server_id"
    t.integer  "x"
    t.integer  "y"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "player_events", :force => true do |t|
    t.integer  "player_id"
    t.integer  "available_ships"
    t.integer  "income"
    t.integer  "ships"
    t.integer  "gold"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "players", :force => true do |t|
    t.integer  "ikariam_id"
    t.string   "ikariam_login"
    t.integer  "user_id"
    t.integer  "server_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "servers", :force => true do |t|
    t.string   "hostname"
    t.string   "name"
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
    t.datetime "created_at"
  end

  create_table "towns", :force => true do |t|
    t.integer  "island_id"
    t.integer  "ikariam_id"
    t.string   "name"
    t.integer  "owner_id"
    t.integer  "server_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "login"
    t.string   "email"
    t.string   "crypted_password",          :limit => 40
    t.string   "salt",                      :limit => 40
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remember_token"
    t.datetime "remember_token_expires_at"
    t.string   "activation_code",           :limit => 40
    t.datetime "activated_at"
    t.string   "state",                                   :default => "passive"
    t.datetime "deleted_at"
    t.boolean  "is_korps"
  end

end
