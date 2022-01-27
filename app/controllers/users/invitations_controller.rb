class Users::InvitationsController < Devise::InvitationsController
  def new
    redirect_to root_path
  end
end
