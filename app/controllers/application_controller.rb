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
    return rails_admin_path if current_admin
    return correct_user_path if current_user && current_user.invitation_token.nil?
    accept_user_invitation_path
  end

  def correct_user_path
    if current_user.agency_user?
      agency_vendors_path(agency_id: current_user.company.id)
    elsif current_user.advertiser_user?
      vendor_campaigns_path(vendor_id: current_user.company.id)
    end
  end

  def after_sign_out_path_for(resource_or_scope)
    new_user_session_path
  end
end
