class Funfact < ApplicationRecord
  belongs_to :location

  # validates_presence_of :description
  # validates_length_of :description, :minimum => 10
end
