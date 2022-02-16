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
  has_many :objectives, dependent: :destroy
  accepts_nested_attributes_for :objectives, allow_destroy: true

  validates :name, presence: true
  validates :campaign_url, http_url: true

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

  def budget
    objectives.filter(&:budget).sum(&:budget)
  end
end
