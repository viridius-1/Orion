class CampaignsController < ApplicationController
  before_action :load_step, only: [:new, :create, :edit, :update]
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
      duplicate: "#{request.path}/duplicate",
      delete: "#{request.path}"
    }
  end

  def new
  end

  def duplicate
    @campaign =  @campaign.dup
    render :new
  end

  def create
    @campaign.status = :pending
    if @campaign.save(context: :flight)
      render json: @campaign
    else
      render json: @campaign.errors, status: :unprocessable_entity
    end
  end
  
  def edit
  end
  
  def update
    @campaign.assign_attributes(campaign_params)
    if @campaign.save(context: step_context)
      return render json: @campaign unless last_step?
      
      # send_internal_notification(request_type)
      # send_customer_confirmation(request_type)
      CampaignMailer.campaign_submitted(current_user, @campaign).deliver_later

      redirect_to vendor_campaigns_path(vendor_id: @campaign.advertiser_id),
                  notice: 'Campaign has been successfully updated.'
    else
      render json: @campaign.errors, status: :unprocessable_entity
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
      :advertiser_id,
      :campaign_url,
      :campaign_type,
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

  def load_step
    @step = params['step']&.to_i || 1
  end

  def step_context
    Campaign::STEPS[@step]
  end

  def last_step?
    @step == Campaign::STEPS.keys.last
  end
end
