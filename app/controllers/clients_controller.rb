class ClientsController < ApplicationController
  before_action :set_agency, only: [:index, :new, :create, :edit, :destroy]
  before_action :set_client, only: [:edit, :update, :destroy]

  def index
    @clients = @agency.clients
  end

  def new
    @client = @agency.clients.new
  end

  def create
    @client = @agency.clients.new(client_params)

    if @client.save
      redirect_to agency_clients_path, notice: 'Campaign was successfully created.'
    else
      render :new
    end
  end

  def edit; end

  def update
    if @client.update(client_params)
      redirect_to agency_clients_path, notice: 'Client has been successfully updated.'
    else
      errors = { alert: @user.errors.full_messages.join(', ') }
      redirect_to edit_advertiser_client_path(@client, client: client_params), errors
    end
  end

  def destroy
    correct_user = CompanyMember.find_by(company_id: @agency.id, user_id: current_user)

    if correct_user && @client.destroy
      flash[:notice] = 'Client successfully deleted'
    else
      flash[:alert] = 'Unable to remove client'
    end

    redirect_to agency_clients_path
  end

  private

  def set_agency
    @agency = Agency.find(params[:agency_id])
  end

  def set_client
    @client = Client.find(params[:id])
  end


  def client_params
    params.require(:client).permit(:name, :website, :industry)
  end
end
