class ObjectivesController < ApplicationController
  skip_forgery_protection only: :destroy
  load_and_authorize_resource

  def destroy
    if @objective.destroy
      head :no_content
    else
      head :unprocessable_entity
    end
  end
end
