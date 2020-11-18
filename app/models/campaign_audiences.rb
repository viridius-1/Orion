class CampaignAudiences < ApplicationRecord
  belongs_to :campaign
  belongs_to :categories, class_name: 'Audience::Category'
end
