class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string :name, :null => false
      t.string :address, :null => false
      t.string :description, :null => false
      t.string :website, :default => '/'

      t.timestamps
    end
  end
end
