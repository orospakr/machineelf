class CreateIslands < ActiveRecord::Migration
  def self.up
    create_table :islands do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :islands
  end
end