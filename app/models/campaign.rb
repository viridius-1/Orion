class Campaign < ApplicationRecord
  has_one :company_campaign, dependent: :destroy
  has_many :campaign_audiences

  validates :name, presence: true

  def company
    company_campaign.company
  end
end
