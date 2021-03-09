class CampaignsController < ApplicationController
  before_action :set_company
  before_action :set_campaign, only: [:edit, :update, :destroy]
  skip_before_action :verify_authenticity_token, only: [:create]

  include ErrorMessages

  def index
    @campaigns = @company&.campaigns
  end

  def new
    @campaign = Campaign.new
    @data_providers = Audience.data_providers
    @is_client = true if @company_type == :agency
  end

  def show
    @campaign = Campaign.find(params[:id])
  end

  def create
    @campaign = Campaign.new(campaign_params)

    if @campaign.save
      create_company_campaign
      # create_campaign_audiences(@campaign, audience_params)

      # request_type = request_type_params[:type].to_sym
      # send_internal_notification(request_type)
      # send_customer_confirmation(request_type)
      render json: { messages: 'Campaign was successfully created.', redirectTo: campaign_paths, status: 200 }
    else
      render json: { messages: display_validation(@campaign), redirectTo: '', status: 422 }
    end
  end

  def edit
    @audiences = Audience.family_tree.as_json
    @is_client = true if @company_type == :agency
  end

  def update
    if @campaign.update(campaign_params)
      redirect_to campaign_paths, notice: 'Campaign has been successfully updated.'
    else
      errors = { alert: { danger: @campaign.errors.full_messages.join(', ') } }
      redirect_to campaign_paths, errors
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
    @company_type = current_user.company_type.downcase.to_sym

    @company = if @company_type == :agency
                Client.find(params[:client_id])
              elsif @company_type == :advertiser
                current_user.company
              end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_campaign
    @campaign = @company.campaigns.find_by(id: params[:id])
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
      :agency_id,
      :client_id,
      :advertiser_id
    )
  end

  def audience_params
    params.require(:audience).permit(ids: [])
  end

  def request_type_params
    params.require(:request_type).permit(:type)
  end

  def create_company_campaign
    CompanyCampaign.create(company_id: @company.id,
                           company_type: @company.class,
                           campaign_id: @campaign.id)
  end

  def campaign_paths
    company_type = current_user.company_type.downcase.to_sym
    if company_type == :agency
      agency_client_campaigns_path(agency_id: @company.agency_id, client_id: @company.id)
    elsif company_type == :advertiser
      advertiser_campaigns_path(advertiser_id: @company.id)
    end
  end

  def create_campaign_audiences(campaign, audience_params)
    audience_params[:ids].each do |id|
      CampaignAudience.create(campaign_id: campaign.id, audience_id: id.to_i)
    end
  end

  def send_internal_notification(request_type)
    CampaignMailer.internal_notification(current_user,
                                         @campaign,
                                         @company,
                                         request_type)
                  .deliver_later
  end

  def send_customer_confirmation(request_type)
    CampaignMailer.customer_confirmation(current_user,
                                         @campaign,
                                         @company,
                                         request_type)
                  .deliver_later
  end
end
