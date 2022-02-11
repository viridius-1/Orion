class CampaignsController < ApplicationController
  load_and_authorize_resource :advertiser, id_param: :vendor_id
  load_and_authorize_resource :campaign, through: :advertiser, shallow: true

  include ErrorMessages

  def index
  end

  def show
    @website = 'www.website.com'
    @button_links = {
      back: vendor_campaigns_path(vendor_id: @campaign.advertiser_id),
      edit: "#{request.path}/edit",
      duplicate: '#',
      delete: "#{request.path}"
    }
  end

  def new
  end

  def create
    @campaign.status = :pending
    if @campaign.save
      request_type = request_type_params.to_sym
      # send_internal_notification(request_type)
      CampaignMailer.campaign_submitted(current_user, @campaign).deliver_later
      send_customer_confirmation(request_type)

      redirect_to vendor_campaigns_path(vendor_id: @advertiser.id),
                  notice: 'Campaign has been successfully created.'
    else
      render json: {messages: display_validation(@campaign), redirectTo: '', status: 422}
    end
  end

  def edit
  end

  def update
    if @campaign.update(campaign_params)
      redirect_to vendor_campaigns_path(vendor_id: @campaign.advertiser_id),
                  notice: 'Campaign has been successfully updated.'
    else
      errors = {alert: {danger: @campaign.errors.full_messages.join(', ')}}
      redirect_to vendor_campaigns_path(vendor_id: @campaign.advertiser_id),
                  errors
    end
  end

  def destroy
    if @campaign.destroy
      flash[:notice] = 'Campaign successfully deleted'
    else
      flash[:alert] = 'Unable to remove campaign'
    end

    redirect_to vendor_campaigns_path(vendor_id: @campaign.advertiser_id)
  end

  private

  def campaign_params
    params.require(:campaign).permit(
      :name,
      :campaign_url,
      :start_date,
      :end_date,
      :goal,
      :kpi,
      :conversion_rate,
      :average_order_value,
      :target_cpa,
      :target_roas,
      :budget,
      :footfall_analysis,
      :crm_data,
      :contextual_targeting,
      :brand_safety,
      :pixel_notes,
      :targeting_notes,
      { age_range_male: [] },
      { age_range_female: [] },
      { household_income: []},
      { geography: [] },
      { geo_fence: [] },
      affinities: {}
    )
  end

  def request_type_params
    params.require(:request_type)
  end

  def send_internal_notification(request_type)
    CampaignMailer.internal_notification(current_user,
                                         @campaign,
                                         @company,
                                         request_type).deliver_later
  end

  def send_customer_confirmation(request_type)
    CampaignMailer.customer_confirmation(current_user,
                                         @campaign,
                                         @company,
                                         request_type).deliver_later
  end
end
