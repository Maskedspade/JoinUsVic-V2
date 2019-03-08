class CreateAnchors < ActiveRecord::Migration[5.1]
  def change
    create_table :anchors do |t|

      t.timestamps
    end
  end
end
