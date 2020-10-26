class ClientsController < ApplicationController
  before_action :set_agency, only: [:index, :new, :create, :edit]
  before_action :set_client, only: [:edit, :update, :destroy]

  def index
    @clients = @agency.clients
  end

  def new
    @client = @agency.clients.new
  end

  def create
    @client = @agency.clients.new(client_params)
  end

  def edit; end

  def update

  end

  def destroy

  end

  private

  def set_agency
    @agency = Agency.find(params[:agency_id])
  end

  def set_client
    @client = @agency.clients.find(params[:id])
  end

  def client_params
    params.require(:client).permit(:name, :website, :industry)
  end
end
