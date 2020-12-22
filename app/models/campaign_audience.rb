class CampaignAudience < ApplicationRecord
  belongs_to :campaign
  belongs_to :audience, class_name: 'Audience'
end
