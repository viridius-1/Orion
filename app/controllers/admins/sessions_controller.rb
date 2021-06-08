# frozen_string_literal: true

class Admins::SessionsController < Devise::SessionsController
  before_action :authorize_admin, only: [:new]

  def new
    super
  end

  private

  def authorize_admin
    redirect_to root_path if user_signed_in?
  end
end
