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
  has_many :creatives, dependent: :destroy
  accepts_nested_attributes_for :objectives

  validates :name, presence: true
  validates :campaign_url, http_url: true

  validates :objectives, length: { minimum: 1, message: "You need to define at least one objective" }, on: :objectives

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

  def flight
    "#{objectives.map(&:start_date).min&.to_s(:mdy)} - #{objectives.map(&:end_date).max&.to_s(:mdy)}"
  end

  def goals
    objectives.map(&:goal).sort.uniq.join(', ')
  end

  def files
    creatives.map { |creative| creative.file.thumb.url }
  end

  def file_urls
    creatives.map { |creative| creative.file.url }.map do |url|
      "#{Rails.application.config.action_mailer.asset_host}#{url}"
    end
  end
end
