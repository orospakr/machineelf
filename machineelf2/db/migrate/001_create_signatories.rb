class CreateSignatories < ActiveRecord::Migration
  def self.up
    create_table :signatories do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :signatories
  end
end
