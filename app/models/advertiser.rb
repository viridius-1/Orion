class Advertiser < ApplicationRecord
  serialize :current_media_mix, Array
  serialize :gender, Array
  serialize :household_income, Array
  serialize :parental_status, Array
  serialize :education, Array
  serialize :language, Array
  serialize :affinity, Array

  belongs_to :user
end
