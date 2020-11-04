class CampaignAudienceSegment < ApplicationRecord
  belongs_to :campaign
  belongs_to :segment, class_name: 'Audience::Segment'
end
