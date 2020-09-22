# frozen_string_literal: true

class DataStudiosController < ApplicationController
  def index
    @advertiser = current_user.advertisers.new
    path = current_user.user_type == 'agency' ? advertisers_path : campaigns_url
    redirect_to path
  end

  def audiences
    @categories = Category.root
    @audiences = current_user.audiences
    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    favorite_id = params[:favorite_id]
    audience = Audience.find(favorite_id)
    current_user.audiences << audience
    @audiences = current_user.audiences
    respond_to do |format|
      format.js { render layout: false }
    end
  end

  def destroy
    favorite_id = params[:favorite_id]
    favorite = current_user.favorites.where(audience_id: favorite_id).first
    favorite.destroy
    @audiences = current_user.audiences
    respond_to do |format|
      format.js { render layout: false }
    end
  end
end
