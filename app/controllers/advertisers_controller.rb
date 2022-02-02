class AdvertisersController < ApplicationController
  load_and_authorize_resource :agency
  before_action :load_advertisers, only: :index
  load_and_authorize_resource :advertiser, through: :agency, shallow: true

  def index
  end

  def new
  end

  def create
    if @advertiser.save
      redirect_to agency_vendors_path(params[:agency_id]),
                  notice: 'Advertiser was successfully created.'
    end
  end

  def edit
  end

  def update
    if @advertiser.update(advertiser_params)
      redirect_to agency_vendors_path(@advertiser.agency_id),
                  notice: 'Advertiser has been successfully updated.'
    else
      errors = {alert: @advertiser.errors.full_messages.join(', ')}
      redirect_to edit_vendor_path(@advertiser, advertiser: advertiser_params), errors
    end
  end

  def destroy
    if @advertiser.destroy
      flash[:notice] = 'Advertiser successfully deleted'
    else
      flash[:alert] = 'Unable to remove Advertiser'
    end

    redirect_to agency_vendors_path(@advertiser.agency_id)
  end

  private

  def load_advertisers
    @advertisers = @agency.advertisers.order(updated_at: :desc).includes(:campaigns)
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
