class Campaign < ApplicationRecord
  serialize :geography, Array
  serialize :geo_fence, Array
  
  belongs_to :advertiser

  validates :name, presence: true

  enum status: {
    incomplete: 0,
    pending: 1,
    approved: 2
  }
  
  enum campaign_type: {
    pre_sales_media_plan: 0,
    managed_service_insertion_order: 1,
    auto_setup: 2
  }
end
