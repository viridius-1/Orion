# frozen_string_literal: true

class DataStudiosController < ApplicationController
  # TODO: this is broken Category.root isn't defined
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
