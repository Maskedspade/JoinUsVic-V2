require 'set'

class LocationsController < ApplicationController
  before_action :set_location, only: [:show, ]

  # GET /locations
  def index
    @locations = Location.order(:id)

    render json: @locations
  end

  # GET /locations/1
  def show
    render json: @location
  end

  def highlight
    keywordIds = params[:keywordIds]
    locationSet = Set.new
    keywordIds.each do |keywordId|
      kw = Keyword.find(keywordId)
      kw.locations.each do |location|
        locationSet.add(location.id)
      end
    end
    render json: locationSet.to_a
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = Location.find(params[:id])
    end

end
