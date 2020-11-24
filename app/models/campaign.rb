class Campaign < ApplicationRecord
  has_one :company_campaign, dependent: :destroy
  has_many :audiences, class_name: 'CampaignAudience'

  validates :name, presence: true

  def company
    company_campaign.company
  end

  def audience_ids
    audiences.pluck(:category_id)
  end
end
