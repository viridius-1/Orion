# frozen_string_literal: true

class DataStudiosController < ApplicationController
  def index

    if current_user.company_type == 'Advertiser'
      redirect_to campaigns_path
    elsif current_user.company_type == 'Agency'
      redirect_to agency_clients_path(agency_id: current_user.company.id)
    end
  end
  def audiences
    @company = current_user.company
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
