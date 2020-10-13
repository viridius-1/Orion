class CampaignMailer < ApplicationMailer

  def internal_notification(user, campaign, type)
    @user = user
    @campaign = campaign
    @agency = user.advertisers.find_by(is_agency: true)
    @advertiser = campaign.advertiser
    @user_ad_profile = Advertiser.find(user.advertiser_profile.id)

    if type == 'recommendation'
      mail(to: 'strategy@theversion2.com', subject: 'Recommendation Request', from: 'Version2 Strategy <strategy@theversion2.com>')
    elsif type == 'insertion_order'
      mail(to: 'strategy@theversion2.com', subject: 'Campaign IO Request', from: 'Version2 Strategy <strategy@theversion2.com>')
    end
  end

  def customer_io_confirmation(user, campaign)
    @user = user
    mail(to: user.email, subject: "IO Confirmation - ##{campaign.id}", from: 'Version2 Strategy <strategy@theversion2.com>')
  end

  def customer_recommendation_confirmation(user, campaign)
    @user = user
    mail(to: user.email, subject: "Recommendation Confirmation - ##{campaign.id}", from: 'Version2 Strategy <strategy@theversion2.com>')
  end
end
