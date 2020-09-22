class AdvertisersController < ApplicationController
  before_action :set_advertiser, only: [:show, :edit, :update, :destroy]
  access all: [:index, :show, :new, :edit, :create, :update, :destroy], user: :all

  # GET /advertisers
  def index
    @advertisers = Advertiser.where(is_agency: nil)
  end

  # GET /advertisers/1
  def show
  end

  # GET /advertisers/new
  def new
    @advertiser = Advertiser.new
  end

  # GET /advertisers/1/edit
  def edit
  end

  # POST /advertisers
  def create
    @advertiser = current_user.advertisers.new(advertiser_params)

    if @advertiser.save
      if !@advertiser.is_agency.nil?
        current_user.update(profile_created: true)
        redirect_to campaigns_url, notice: 'Profile was successfully created.'
      else
        redirect_to campaigns_url, notice: 'Advertiser was successfully created.'
      end

    else
      render :new
    end
  end

  # PATCH/PUT /advertisers/1
  def update
    if @advertiser.update(advertiser_params)
      if !@advertiser.is_agency.nil?
        redirect_to campaigns_url, notice: 'Profile was successfully updated.'
      else
        redirect_to @advertiser, notice: 'Advertiser was successfully updated.'
      end

    else
      render :edit
    end
  end

  # DELETE /advertisers/1
  def destroy
    @advertiser.destroy
    redirect_to advertisers_url, notice: 'Advertiser was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_advertiser
      @advertiser = Advertiser.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def advertiser_params
      params.require(:advertiser).permit(
        :company_name,
        :website,
        :user_id,
        :logo_url,
        :industry,
        :client_count,
        :preferred_service_level,
        :customer_target,
        :monthly_unique_visitors,
        :average_order_value,
        :conversion_rate,
        :cost_per_acquisition,
        :age_range_start,
        :age_range_end,
        :is_agency,
        :current_media_mix => [],
        :gender => [],
        :household_income => [],
        :parental_status => [],
        :education => [],
        :language => [],
        :affinity => []
        )
    end
end
