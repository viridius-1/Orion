class AgenciesController < ApplicationController
  before_action :set_company

  def show; end

  def edit; end

  def update
    if @agency.update(agency_params)
      redirect_to agency_clients_path(agency_id: @agency), notice: "#{@agency.name} was successfully updated."
    else
      render :edit
    end
  end

  private

  def set_company
    @agency = Agency.find(params[:id])
  end

  def agency_params
    params.require(:agency).permit(:name, :website)
  end
end
