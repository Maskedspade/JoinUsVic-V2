class AddAnchorToLocations < ActiveRecord::Migration[5.1]
  def change
    add_reference :locations, :anchor, foreign_key: true
  end
end
