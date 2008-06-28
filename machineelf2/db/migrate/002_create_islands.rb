class CreateIslands < ActiveRecord::Migration
  def self.up
    create_table :islands do |t|
      t.integer :ikariam_id
      t.integer :server_id
      t.string :name
      t.timestamps
    end
  end

  def self.down
    drop_table :islands
  end
end
