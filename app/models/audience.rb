class Audience < ApplicationRecord
  belongs_to :category

  has_many :campaign_audiences
  has_many :campaigns, through: :campaign_audiences
  has_many :favorites
  has_many :users, through: :favorites
end
