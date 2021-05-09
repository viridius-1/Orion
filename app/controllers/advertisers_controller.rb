class AdvertisersController < ApplicationController
  before_action :set_advertiser, only: [:show, :edit, :update, :destroy]

  def show; end

  def edit; end

  # POST /advertisers
  def create
    @advertiser = Advertiser.new(advertiser_params)
    CompanyMember.create(company_id: @advertiser.id,
                         company_type: 'Advertiser',
                         user_id: current_user.id)

    if @advertiser.save
      if @advertiser.is_agency.nil?
        redirect_to campaigns_path, notice: "#{@advertiser.name} was successfully created."
      else
        redirect_to campaigns_path(advertiser: @advertiser.id)
      end
    else
      render :new
    end
  end

  # PATCH/PUT /advertisers/1
  def update
    if @advertiser.update(advertiser_params)
      redirect_to advertiser_path, notice: "#{@advertiser.name} was successfully updated."
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
      :name,
      :website_url,
      :user_id,
      :agency_id,
      :industry,
      :business_type,
      :annual_revenue
      :monthly_unique_visitors,
      :current_media_mix => [],
      )
  end
end
