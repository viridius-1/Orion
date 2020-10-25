class CampaignsController < ApplicationController
  before_action :set_company, only: [:index, :new, :create, :edit]
  before_action :set_campaign, only: [:edit, :update, :destroy]

  def index
    @campaigns = @company.campaigns
  end

  def new
    @campaign = Campaign.new
    @campaign.campaign_audiences.build
  end

  def create
    @campaign = Campaign.new(campaign_params)

    if @campaign.save
      create_company_campaign

      request_type = params[:request_type]

      send_internal_notification(request_type)
      send_customer_confirmation(request_type)

      redirect_to campaigns_path, notice: 'Campaign was successfully created.'
    else
      render :new
    end
  end

  def edit; end

  def update
    if @campaign.update(campaign_params)
      redirect_to campaigns_path(advertiser: campaign_params[:advertiser_id]), notice: 'Campaign has been successfully updated.'
    else
      errors = { alert: { danger: @campaign.errors.full_messages.join(', ') } }
      redirect_to edit_campaign_path(@campaign, campaign: campaign_params), errors
    end
  end

  def destroy
    if @campaign.destroy
      flash[:notice] = 'Campaign successfully deleted'
    else
      flash[:alert] = 'Unable to remove campaign'
    end

    redirect_back(fallback_location: root_path)
  end

  private

  def set_company
    @company = current_user.company
  end
  # Use callbacks to share common setup or constraints between actions.
  def set_campaign
    @campaign = current_user.company.campaigns.find_by(id: params[:id])
  end

  # Never trust parameters from the scary internet,
  # only allow the white list through.
  def campaign_params
    params.require(:campaign).permit(
      :name,
      :url,
      :flight_start_date,
      :flight_end_date,
      :goal,
      :kpi,
      :cpa_goal,
      :roas_goal,
      :budget,
      :geography,
      audience_ids: []
    )
  end

  def create_company_campaign
    CompanyCampaign.create(company_id: @company.id,
                           company_type: current_user.company_type,
                           campaign_id: @campaign.id)
  end

  def send_internal_notification(request_type)
    CampaignMailer.internal_notification(current_user,
                                         @campaign,
                                         request_type.to_sym)
                  .deliver_later
  end

  def send_customer_confirmation(request_type)
    CampaignMailer.customer_confirmation(current_user,
                                         @campaign,
                                         request_type.to_sym)
                  .deliver_later
  end
end
