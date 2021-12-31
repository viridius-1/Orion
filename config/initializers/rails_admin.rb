RailsAdmin.config do |config|

  ### Popular gems integration

  # Devise
  config.authenticate_with do
    warden.authenticate! scope: :admin
  end

  config.current_user_method(&:current_admin)

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == CancanCan ==
  # config.authorize_with :cancancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model 'User' do
    list do
      field :id
      field :first_name
      field :last_name
      field :email
      field :roles
      field :company
    end

    edit do
      field :first_name
      field :last_name
      field :email
      field :password
      field :roles
      field :company
    end
  end

  config.model 'Admin' do
    list do
      field :id
      field :first_name
      field :last_name
      field :email
    end

    edit do
      field :first_name
      field :last_name
      field :email
      field :password
    end
  end

    # Hide models here
  list_of_models = %w[Category
                      Connection
                      Favorite
                      Audience
                      CampaignAudience]

  list_of_models.each do |model_name|
    config.model(model_name) do
      visible false
    end
  end
end
