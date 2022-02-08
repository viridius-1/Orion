class Campaign < ApplicationRecord
  STEPS = {
    1 => :flight,
    2 => :objectives,
    3 => :demographics,
    4 => :audiences
  }

  serialize :geography, Array
  serialize :geo_fence, Array
  
  belongs_to :advertiser

  validates :name, presence: true
  validates :name, uniqueness: true
  validates :campaign_url, format: { with: URI.regexp, message: 'URL is not valid' }

  validates :conversion_rate,
            :average_order_value,
            :target_cpa, 
            :target_roas,
            :budget,
            :pixel_notes, presence: true, on: STEPS.values_at(2, 3, 4)

  validates :conversion_rate,
            :target_roas, inclusion: { in: 0..100, message: 'must be between 0 and 100' }, on: STEPS.values_at(2, 3, 4)

  validates :average_order_value,
            :target_cpa,
            :budget, numericality: { greater_than_or_equal_to: 0 }, on: STEPS.values_at(2, 3, 4)

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
