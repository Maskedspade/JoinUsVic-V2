class CreateJoinTableLocationKeyword < ActiveRecord::Migration[5.1]
  def change
    create_join_table :locations, :keywords do |t|
       t.index [:location_id, :keyword_id]
       t.index [:keyword_id, :location_id]
    end
  end
end
