class CampaignAudience < ApplicationRecord
  belongs_to :campaign
  belongs_to :audience
end
