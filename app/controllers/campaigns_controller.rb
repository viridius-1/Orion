class CampaignsController < ApplicationController
  before_action :set_company
  before_action :set_campaign, only: [:edit, :update, :destroy]
  skip_before_action :verify_authenticity_token, only: [:create]

  include ErrorMessages

  def index
    @campaigns = @company&.campaigns
  end

  def show
    @campaign = Campaign.find(params[:id])
    if current_user.company_type == 'Advertiser'
      @website = 'www.website.com'
      back = advertiser_campaigns_path(params[:advertiser_id])
    else
      @website = Client.find(params[:client_id]).website

      back = agency_client_campaigns_path(params[:agency_id], params[:client_id])
    end

    @button_links = {
        back: back,
        edit: "#{request.path}/edit",
        duplicate: '#',
        delete: "#{request.path}"
    }
  end

  def new
    @client = Client.find(params[:client_id])
    @campaign = Campaign.new
    providers_nested = File.read('./lib/data_providers/acxiom-data-nested.json')
    providers_key_value = File.read('./lib/data_providers/acxiom-data-key-value.json')
    @data_providers_nested = JSON.parse(providers_nested)
    @data_providers_key_value= JSON.parse(providers_key_value)
  end

  def create
    @campaign = Campaign.new(campaign_params.merge(status: "pending_approval"))
    if @campaign.save
      create_company_campaign
      request_type = request_type_params.to_sym
      send_internal_notification(request_type)
      send_customer_confirmation(request_type)

      redirect_to campaign_paths, notice: 'Campaign has been successfully created.'
    else
      render json: { messages: display_validation(@campaign), redirectTo: '', status: 422 }
    end
  end

  def edit
    @client = Client.find(params[:client_id])
    @campaign = Campaign.find(params[:id])
    providers_nested = File.read('./lib/data_providers/acxiom-data-nested.json')
    providers_key_value = File.read('./lib/data_providers/acxiom-data-key-value.json')
    @data_providers_nested = JSON.parse(providers_nested)
    @data_providers_key_value= JSON.parse(providers_key_value)
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
      {:age_range_male => []},
      {:age_range_female => []},
      {:household_income => []},
      :education,
      :parental_status,
      :geography,
      :affinities => {}
    )
  end

  def audience_params
    params.require(:audience)
  end

  def request_type_params
    params.require(:request_type)
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
    audience_params.each do |id|
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
