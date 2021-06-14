class AdvertisersController < ApplicationController
  before_action :set_agency, only: [:index, :new, :create, :destroy]
  before_action :verify_agency_access, only: [:index, :new, :create, :destroy]

  before_action :set_advertiser, only: [:edit, :update, :destroy]
  before_action :verify_advertiser_access, only: [:edit, :update, :destroy]

  def index
    advertisers = @agency.advertisers.order(updated_at: :desc)
    @advertisers_with_campaigns = advertisers.map do |advertiser|
      new_advertiser = advertiser.attributes
      new_advertiser[:campaigns] = advertiser.campaigns
      new_advertiser
    end
  end

  def new
    @advertiser = @agency.advertisers.new
  end

  def create
    @advertiser = @agency.advertisers.new(advertiser_params)
    if @advertiser.save
      redirect_to agency_advertisers_path(params[:agency_id]),
                  notice: 'Advertiser was successfully created.'
    end
  end

  def edit;
  end

  def update
    if @advertiser.update(advertiser_params)
      redirect_to agency_advertisers_path(params[:agency_id]),
                  notice: 'Advertiser has been successfully updated.'
    else
      errors = {alert: @user.errors.full_messages.join(', ')}
      redirect_to edit_advertisers_path(@advertiser, advertiser: advertiser_params), errors
    end
  end

  def destroy
    correct_user = User.find_by(company_id: @agency.id, id: current_user.id)

    if correct_user && @advertiser.destroy
      flash[:notice] = 'Advertiser successfully deleted'
    else
      flash[:alert] = 'Unable to remove Advertiser'
    end

    redirect_to agency_advertisers_path(params[:agency_id])
  end

  private

  def set_agency
    @agency = Agency.find(params[:agency_id])
  end

  def verify_agency_access
    redirect_to root_path unless can? :read, @agency
  end

  def set_advertiser
    @advertiser = Advertiser.find(params[:id])
  end

  def verify_advertiser_access
    redirect_to root_path unless can? :read, @advertiser
  end

  def advertiser_params
    params.require(:advertiser).permit(
      :annual_revenue,
      :name,
      :website_url,
      :industry,
      :business_type,
      :monthly_unique_visitors,
      {:current_media_mix => []}
    )
  end
end
