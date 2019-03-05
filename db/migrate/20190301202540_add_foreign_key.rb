class AddForeignKey < ActiveRecord::Migration[5.1]
  def change
    add_foreign_key :funfacts, :locations
    add_foreign_key :ratings, :locations
  end
end
