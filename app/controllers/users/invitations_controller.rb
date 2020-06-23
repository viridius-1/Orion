class Users::InvitationsController < Devise::InvitationsController
  before_action :configure_permitted_parameters
  access user: [], all: [:edit]

  protected

  def after_invite_path_for(current_inviter, resource)
    users_path
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:invite, keys: [:first_name, :last_name, :company, :roles, :user_type])
  end

end
