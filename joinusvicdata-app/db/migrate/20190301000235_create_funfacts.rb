class CreateFunfacts < ActiveRecord::Migration[5.1]
  def change
    create_table :funfacts do |t|
      t.string :user_name, :default => '@Someone@'
      t.string :description, :null => false
      t.integer :location_id, :references => [:location, :id]

      t.timestamps null: false
    end
  end
end
