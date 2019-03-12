Rails.application.routes.draw do
  scope '/api' do
    resources :locations, only: [:index, :show]
      post 'locations/highlighted' => 'locations#highlight'
    resources :keywords, only: [:index]
    resources :funfacts, only: [:index, :create]
    resources :ratings, only: [:index, :show, :create, :update]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
