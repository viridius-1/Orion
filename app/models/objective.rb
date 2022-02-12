class Objective < ApplicationRecord
  after_initialize :set_defaults
  before_save :delete_unused_fields!

  belongs_to :campaign

  validates :media_channel, presence: true, inclusion: { in: Objectives::DependentFields.all_media_channel_options }
  validates :goal, presence: true, inclusion: { 
    in: ->(objective) { Objectives::DependentFields.goal_options_for(objective.media_channel) }
  }
  validates :kpi, presence: true, inclusion: {
    in: -> (objective) { Objectives::DependentFields.kpi_options_for(objective.goal) }
  }

  validates :start_date, :end_date, presence: true
  validate :valid_date_range

  with_options if: -> (objective) { objective.kpi == "Impressions" } do
    validates :budget, :impressions, :frequency, :unique_reach, presence: true
  end

  with_options if: -> (objective) { objective.kpi == "Click Through Rate (CTR)" } do
    validates :budget, :impressions, :target_ctr, presence: true
  end

  with_options if: -> (objective) { objective.kpi == "Video Completion Rate (VCR)" } do
    validates :budget, :video_plays, :video_completion_rate, presence: true
  end

  with_options if: -> (objective) { objective.kpi == "Cost Per Acquisition (CPA)" } do
    validates :budget, :impressions, :conversions, :target_conversion_rate, presence: true
  end

  with_options if: -> (objective) { objective.kpi == "Return on Ad Spend (ROAS)" } do
    validates :budget, :impressions, :conversions, :target_conversion_rate,
              :target_cpa, :average_order_value, :target_roas, presence: true
  end
 
  private

  def set_defaults
    self.media_channel ||= ''
    self.goal ||= ''
    self.kpi ||= ''
  end

  def delete_unused_fields!
    # each KPI allows for different fields, so if KPI is changed we want
    # to nilify all the previously set fields that are no longer needed
    unused_fields.each do |attribute|
      self[attribute] = nil
    end
  end

  def unused_fields
    Objectives::DependentFields.all_fields - Objectives::DependentFields.fields_for(self.kpi)
  end

  def valid_date_range
    return unless start_date && end_date && start_date > end_date

    errors.add(:end_date, "must be after start date")
  end
end
