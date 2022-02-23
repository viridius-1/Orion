Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :admin, skip: [:sessions]
  devise_scope :admin do
    get 'admins/sign_in', to: 'admins/sessions#new', as: :new_admin_session
    post 'admins/sign_in', to: 'admins/sessions#create', as: :admin_session
    get 'admins/destroy', to: 'admins/sessions#destroy', as: :destroy_admin_session
  end

  apipie

  devise_for :users, controllers: {invitations: 'users/invitations',
                                   registrations: 'users/registrations'}

  root 'dashboard#index'

  get 'creative_studios', to: 'pages#creative_studios'
  get 'platforms', to: 'pages#platforms'

  resources :dashboard, only: :index

  resources :campaigns, only: [:new, :create]
  resources :objectives, only: :destroy

  resources :agencies, shallow: true do
    resources :vendors, controller: 'advertisers' do
      resources :campaigns do
        get "duplicate", on: :member
      end
    end
  end

  resources :users, only: [:edit, :update]

  namespace :api do
    namespace :v1 do
      post 'tapclicks/authenticate', to: 'authenticate#create'
    end
  end
end
