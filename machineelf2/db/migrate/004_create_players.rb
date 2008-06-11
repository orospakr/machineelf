class CreatePlayers < ActiveRecord::Migration
  def self.up
    create_table :players do |t|
      t.integer :ikariam_id
      t.string :ikariam_login

      t.timestamps
    end
  end

  def self.down
    drop_table :players
  end
end
