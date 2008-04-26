class CreateTowns < ActiveRecord::Migration
  require_dependency 'town'
  def self.up
    create_table :towns do |t|
      t.integer :island_id
      t.integer :ikariam_id
      t.datetime :found_at
      t.string :name
      t.integer :owner_id
      t.integer :wood
      t.integer :wine
      t.integer :marble
      t.integer :crystal
      t.integer :sulphur
      t.integer :version
      t.timestamps
    end
    Town.create_versioned_table
  end

  def self.down
    Town.drop_versioned_table
    drop_table :towns
  end
end
