class PagesController < ApplicationController

  # render the single page app
  def index
    @keywords_data = Keyword.all.order(created_at: :desc)
    @funfacts_data = Funfact.all.order(created_at: :desc)
    @locations_data = Location.all.order(created_at: :desc)
  end

end

