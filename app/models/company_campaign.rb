class CompanyCampaign < ApplicationRecord
  belongs_to :company, polymorphic: true, optional: true
  belongs_to :campaign, optional: true
end
