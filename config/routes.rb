Rails.application.routes.draw do
  
  apipie
  devise_for :users, controllers: { invitations: 'users/invitations' }

  root 'data_studios#index'

  get 'studios/audiences', to: 'data_studios#audiences'

  resources :users, except: :show
  resources :data_studios, only: [:index, :create, :destroy]
  resources :platforms, only: :index
  resources :advertisers
  resources :campaigns

  namespace :api do
    namespace :v1 do 
      post 'tapclicks/authenticate', to: 'authenticate#create'
    end
  end

  get 'redirect_landing', to: 'pages#redirect_landing'
  get 'redirect', to: 'pages#redirect'
end
