class Campaign < ApplicationRecord
  belongs_to :advertiser

  has_many :campaign_audiences
  has_many :audiences, through: :campaign_audiences

  validates :name, :advertiser, presence: true

  accepts_nested_attributes_for :audiences
end
