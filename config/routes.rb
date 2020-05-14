Rails.application.routes.draw do
  devise_for :users, controllers: { invitations: 'users/invitations' }

  root 'data_studios#index'

  resources :users, except: :show
  resources :data_studios, only: :index
  resources :platforms, only: :index
end
