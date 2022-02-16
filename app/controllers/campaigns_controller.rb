class CampaignsController < ApplicationController
  before_action :load_step, only: [:new, :create, :edit, :update]
  load_and_authorize_resource :advertiser, id_param: :vendor_id
  load_and_authorize_resource :campaign, through: :advertiser, shallow: true

  include ErrorMessages

  def index
    @campaigns = @campaigns.preload(:objectives)
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
    @campaign.assign_attributes(flight_params)
    if @campaign.save(context: :flight)
      render json: @campaign.as_json(include: :objectives)
    else
      render(
        json: @campaign.as_json(
          methods: :errors,
          include: { objectives: { methods: :errors} }
        ), 
        status: :unprocessable_entity
      )
    end
  end
  
  def edit
  end
  
  def update
    @campaign.assign_attributes(campaign_params)
    if @campaign.save(context: step_context)
      return render json: @campaign.as_json(include: :objectives) unless last_step?
      
      # send_internal_notification(request_type)
      # send_customer_confirmation(request_type)
      CampaignMailer.campaign_submitted(current_user, @campaign).deliver_later

      redirect_to vendor_campaigns_path(vendor_id: @campaign.advertiser_id),
                  notice: 'Campaign has been successfully updated.'
    else
      render(
        json: @campaign.as_json(
          methods: :errors,
          include: { objectives: { methods: :errors} }
        ), 
        status: :unprocessable_entity
      )
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
    case @step
    when 1 then flight_params
    when 2 then objectives_params
    when 3 then demographics_params
    when 4 then audiences_params
    end
  end

  def flight_params
    params.require(:campaign).permit(
      :advertiser_id, :name, :campaign_url, :campaign_type
    )
  end

  def objectives_params
    params.require(:campaign).permit(
      objectives_attributes: [
        :id, :_destroy, :goal, :media_channel, :kpi, :start_date,
        :end_date, :budget, :impressions, :frequency, :frequency_unit,
        :unique_reach, :target_ctr, :video_plays, :video_completion_rate,
        :conversions, :target_conversion_rate, :target_cpa,
        :average_order_value, :target_roas
      ]
    ).tap do |permitted_params|
      remove_unwanted_objective_params_from permitted_params
    end
  end

  def demographics_params
    params.require(:campaign).permit(
      { age_range_male: [] },
      { age_range_female: [] },
      { household_income: []},
      { geography: [] },
      { geo_fence: [] },
      :footfall_analysis,
      :crm_data,
      :contextual_targeting,
      :brand_safety,
      :targeting_notes
    )
  end

  def audiences_params
    params.require(:campaign).permit(
      affinities: {}
    )
  end

  def remove_unwanted_objective_params_from raw_params
    # We don't want to allow fields which are not in the list for target kpi
    raw_params.fetch(:objectives_attributes, []).map do |objective|
      next if objective['_destroy']

      objective.delete_if { |attribute, value| !attribute.to_sym.in?(allowed_attributes_for(objective))}
    end
  end

  def allowed_attributes_for objective
    common_attributes = [:id, :goal, :media_channel, :kpi, :_destroy, :start_date, :end_date]
    kpi = objective.fetch(:kpi, nil)

    return common_attributes unless kpi
    return common_attributes.concat(Objectives::DependentFields.fields_for(kpi))
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
