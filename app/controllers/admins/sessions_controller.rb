# frozen_string_literal: true

class Admins::SessionsController < Devise::SessionsController
  before_action :redirect_if_logged_in, only: [:new]

  def new
    super
  end

  private

  def redirect_if_logged_in
    redirect_to root_path if user_signed_in?
  end
end
