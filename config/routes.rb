Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :admin, skip: [:sessions]
  devise_scope :admin do
    get 'admins/sign_in', to: 'admins/sessions#new', as: :new_admin_session
    post 'admins/sign_in', to: 'admins/sessions#create', as: :admin_session
    delete 'admins/destroy', to: 'admins/sessions#destroy', as: :destroy_admin_session
  end

  apipie

  devise_for :users, controllers: {invitations: 'users/invitations',
                                   registrations: 'users/registrations'}

  root 'dashboard#index'

  resources :dashboard, only: :index
  resources :platforms, only: :index

  resources :agencies do
    resources :users
    resources :vendors, controller: 'advertisers'
  end

  resources :vendors, controller: 'advertisers' do
    resources :users, :campaigns
  end

  resources :users, only: [:edit, :update]

  namespace :api do
    namespace :v1 do
      post 'tapclicks/authenticate', to: 'authenticate#create'
    end
  end
end
