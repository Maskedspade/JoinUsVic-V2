class Rating < ApplicationRecord
  belongs_to :location

  # validates_presence_of :score, :location_id
  # validates :score, numericality: {greater_than_or_equal_to: 1, less_than_or_equal_to: 5}
end
