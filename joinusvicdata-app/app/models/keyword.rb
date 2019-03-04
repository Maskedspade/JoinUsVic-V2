class Keyword < ApplicationRecord
  has_and_belongs_to_many :locations

  # validates_presence_of :name
  # validates_length_of :name, :minimum => 2
end
