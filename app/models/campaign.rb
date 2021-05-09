class Campaign < ApplicationRecord
  has_one :company_campaign, dependent: :destroy
  has_many :audiences, class_name: 'CampaignAudience'

  validates :name, presence: true

  def company
    company_campaign.company
  end

  def audience_ids
    audiences.pluck(:audience_id)
  end

  def audience_names
    audiences.map { |ca| ca.audience.name }
  end
end
