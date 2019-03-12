class FunfactsController < ApplicationController
  before_action :set_funfact, only: [:show, :update, :destroy]

  # GET /funfacts
  def index
    @funfacts = Funfact.order(:id)

    render json: @funfacts
  end

  # GET /funfacts/1
  def show
    render json: @funfact
  end

  # POST /funfacts
  def create
    @funfact = Funfact.new(funfact_params)

    if @funfact.save
      render json: @funfact, status: :created
    else
      render json: @funfact.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /funfacts/1
  def update
    if @funfact.update(funfact_params)
      render json: @funfact
    else
      render json: @funfact.errors, status: :unprocessable_entity
    end
  end

  # DELETE /funfacts/1
  def destroy
    @funfact.destroy
    if @funfact.destroy
      head :no_content, status: :ok
    else
      render json: @funfact.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions
    def set_funfact
      @funfact = funfact.find(params[:id])
    end

    # Only allow a trusted parameter "white funfact" through
    def funfact_params
      params.require(:funfact).permit(:user_name, :description,)
    end

end
