Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :admin, skip: [:sessions]
  devise_scope :admin do
    get 'admins/sign_in', to: 'admins/sessions#new', as: :new_admin_session
    post 'admins/sign_in', to: 'admins/sessions#create', as: :admin_session
    delete 'admins/destroy', to: 'admins/sessions#destroy', as: :destroy_admin_session
  end

  apipie

  devise_for :users, controllers: { invitations: 'users/invitations',
                                    registrations: 'users/registrations' }

  root 'data_studios#index'

  get 'studios/audiences', to: 'data_studios#audiences'

  resources :data_studios, only: [:index, :create, :destroy]
  resources :platforms, only: :index

  get 'audiences/:id', to: 'audiences#show', as: :audiences

  resources :agencies do
    resources :users

    resources :clients do
      resources :campaigns
    end
  end

  resources :advertisers do
    resources :users
    resources :campaigns
  end

  namespace :api do
    namespace :v1 do
      post 'tapclicks/authenticate', to: 'authenticate#create'
    end
  end

  get 'redirect_landing', to: 'pages#redirect_landing'
  get 'redirect', to: 'pages#redirect'
end
