class AudiencesController < ApplicationController
  def show
    data_provider = Audience.where(id: params[:id])
    @audiences = Audience.get_descentants(data_provider)

    render json: { audiences: @audiences, message: 'success', status: 200 }
  end
end
