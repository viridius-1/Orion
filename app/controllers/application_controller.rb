class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  rescue_from 'CanCan::AccessDenied' do
    redirect_to root_path
  end

  private

  def layout_by_resource
    if devise_controller? && controller_name != 'invitations'
      'devise'
    else
      if controller_name == 'invitations' && action_name == 'edit'
        'devise'
      else
        'application'
      end
    end
  end

  def after_sign_in_path_for(resource)
    is_admin = resource.class == Admin
    invite_awaits = resource.class == User && resource.invitation_token.nil?

    if is_admin
      rails_admin_path
    elsif invite_awaits
      root_path
    elsif !invite_awaits
      accept_user_invitation_path
    end
  end

  def after_sign_out_path_for(resource_or_scope)
    new_user_session_path
  end
end
