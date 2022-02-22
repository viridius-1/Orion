# frozen_string_literal: true

class DashboardController < ApplicationController
  def index
    redirect_to correct_user_path
  end
end
