class CreateTowns < ActiveRecord::Migration
  def self.up
    create_table :towns do |t|
      t.integer :island_id
      t.datetime :found_at
      t.datetime :updated_at
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
  end

  def self.down
    drop_table :towns
  end
end
