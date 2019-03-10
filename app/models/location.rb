class Location < ApplicationRecord
  has_many :ratings
  has_many :funfacts
  has_and_belongs_to_many :keywords
  belongs_to :anchor

  validates_presence_of :name, :address, :description, :anchor_id
  validates_length_of :address, :minimum => 5
  validates_length_of :description, :minimum => 20
end
