class RatingsController < ApplicationController
  before_action :set_rating, only: [:show, :update, :destroy]

  # GET /ratings
  def index
    @ratings = Rating.order(:id)

    render json: @ratings
  end

  # GET /ratings/1
  def show
    render json: @rating
  end

  # POST /ratings
  def create
    @rating = Rating.new(rating_params)

    loc_id = @rating[:location_id]

    @ratings = []

    Rating.where(:location_id => loc_id).find_each do |rating|
      @ratings.push(rating[:score])
    end

    result = @ratings.inject{ |sum, el| sum + el }.to_f / @ratings.size
    result = result.round(1)

    if @rating.save
      render json: {
      :new_ave => result
    }, status: :created
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /ratings/1
  def update
    if @rating.update(rating_params)
      render json: @rating
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ratings/1
  def destroy
    @rating.destroy
    if @rating.destroy
      head :no_content, status: :ok
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions
    def set_rating
      @rating = rating.find(params[:id])
    end

    # Only allow a trusted parameter "white rating" through
    def rating_params
      params.require(:rating).permit(:score, :location_id)
    end
end

