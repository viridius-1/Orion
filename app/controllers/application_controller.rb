class ApplicationController < ActionController::Base
  layout :layout_by_resource
  before_action :authenticate_user!

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
end
