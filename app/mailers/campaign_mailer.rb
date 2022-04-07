class CampaignMailer < ApplicationMailer

  def internal_notification(user, campaign, company, type)
    @user = user
    @campaign = campaign
    @company = company

    type_titles = {recommendation: 'Recommendation', insertion_order: "Campaign IO"}

    mail(to: 'strategy@theversion2.com',
         subject: "#{type_titles[type]} Request",
         from: 'Version2 Strategy <strategy@theversion2.com>')
  end

  def customer_confirmation(user, campaign)
    @user = user
    @campaign = campaign

    type_titles = {pre_sales_media_plan: 'Recommendation',
                   managed_service_insertion_order: "IO",
                   self_service_auto_setup: "Auto Setup"}

    mail(to: user.email,
         subject: "Orion Campaign #{type_titles[campaign.campaign_type.to_sym]} Confirmation - #{campaign.name}",
         from: 'Version2 Strategy <strategy@theversion2.com>')
  end

  def campaign_submitted(user, campaign, subject = "New campaign was submited")
    @campaign = campaign
    @user = user
    @objectives = @campaign.objectives
    @subject = subject

    mail(to: 'strategy@theversion2.com',
         subject: subject,
         from: 'Version2 Strategy <strategy@theversion2.com>')
  end
end

