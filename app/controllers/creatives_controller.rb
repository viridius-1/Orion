class CreativesController < ApplicationController
  skip_forgery_protection only: [:create, :destroy]
  load_and_authorize_resource :campaign
  load_and_authorize_resource :creative, through: :campaign, shallow: true

  def index
    render json: @creatives.as_json
  end

  def create
    if @creative.save
      jsonCreative = @creative.as_json
      jsonCreative['filetype'] = @creative.filetype
      jsonCreative['name'] = @creative.name
      jsonCreative['shortname'] = @creative.shortname
      render json: jsonCreative
    else
      head :unprocessable_entity
    end
  end

  def destroy
    if @creative.destroy
      head :no_content
    else
      head :unprocessable_entity
    end
  end

  private

  def creative_params
    params.permit(:file, :campaign_id)
  end
end
