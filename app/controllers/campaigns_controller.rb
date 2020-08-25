class CampaignsController < ApplicationController
  before_action :set_campaign, only: [:edit, :update, :destroy]

  def index
    @campaigns = current_user.campaigns
  end

  def new
    @campaign = Campaign.new
  end

  def create
    @campaign = Campaign.new(campaign_params)

    if @campaign.save
      request_type = params[:request_type]
      if request_type == 'recommendation'
        CampaignMailer.internal_notification(current_user, @campaign, 'recommendation').deliver_later
        CampaignMailer.customer_recommendation_confirmation(current_user, @campaign).deliver_later
      elsif request_type == 'insertion_order'
        CampaignMailer.internal_notification(current_user, @campaign, 'insertion_order').deliver_later
        CampaignMailer.customer_io_confirmation(current_user, @campaign).deliver_later
      end
      redirect_to campaigns_url, notice: 'Campaign was successfully created.'
    else
      render :new
    end
  end

  def edit; end

  def update
    if @campaign.update(campaign_params)
      redirect_to campaigns_path, notice: 'Campaign has been successfully updated.'
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

  # Use callbacks to share common setup or constraints between actions.
  def set_campaign
    @campaign = current_user.campaigns.find(params[:id])
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
      :audience_targeting,
      :advertiser_id
    )
  end
end
