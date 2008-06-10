class CreateTowns < ActiveRecord::Migration
  require_dependency 'town'
  def self.up
    create_table :towns do |t|
      t.integer :island_id
      t.integer :ikariam_id
      t.string :name
      t.integer :owner_id
      t.timestamps
    end
   end

  def self.down
    drop_table :towns
  end
end
