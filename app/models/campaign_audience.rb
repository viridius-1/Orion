class CampaignAudience < ApplicationRecord
  belongs_to :campaign
  belongs_to :category, class_name: 'Audience::Category'
end
