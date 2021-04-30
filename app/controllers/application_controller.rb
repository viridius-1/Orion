class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  helper_method :get_first_client_id


  # This will probably go away when we decouple advertiser and client
  def get_first_client_id
    agency = Agency.find(current_user.company.id)
    agency.clients.first.id
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
end
