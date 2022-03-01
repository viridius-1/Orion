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
  accepts_nested_attributes_for :objectives

  validates :name, presence: true
  validates :campaign_url, http_url: true

  enum status: {
    under_review: 0,
    staging: 1,
    active: 2,
    paused: 3,
    complete: 4
  }
  
  enum campaign_type: {
    pre_sales_media_plan: 0,
    managed_service_insertion_order: 1,
    self_service_auto_setup: 2
  }

  def budget
    objectives.filter(&:budget).sum(&:budget)
  end
end
