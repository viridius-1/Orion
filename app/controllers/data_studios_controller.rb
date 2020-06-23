# frozen_string_literal: true
class DataStudiosController < ApplicationController
  def index
    @advertiser = current_user.advertisers.new
    redirect_to campaigns_url if current_user.profile_created
  end
end
