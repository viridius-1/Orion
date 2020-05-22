Rails.application.routes.draw do
  apipie
  devise_for :users, controllers: { invitations: 'users/invitations' }

  root 'data_studios#index'

  resources :users, except: :show
  resources :data_studios, only: :index
  resources :platforms, only: :index

  namespace :api do
    namespace :v1 do 
      post 'tapclicks/authenticate', to: 'authenticate#create'
    end
  end
end
