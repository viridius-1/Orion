class Campaign < ApplicationRecord
  has_one :company_campaign
  has_many :campaign_audiences
  has_many :audiences, through: :campaign_audiences

  validates :name, presence: true

  accepts_nested_attributes_for :audiences

  def company
    company_campaign.company
  end
end
