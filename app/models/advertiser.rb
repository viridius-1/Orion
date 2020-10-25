class Advertiser < ApplicationRecord
  serialize :current_media_mix, Array
  serialize :gender, Array
  serialize :household_income, Array
  serialize :parental_status, Array
  serialize :education, Array
  serialize :language, Array
  serialize :affinity, Array

  has_many :company_members, as: :company
  has_many :users, through: :company_members
  has_many :company_campaigns, as: :company
  has_many :campaigns, through: :company_campaigns

  validates :name, presence: true
end
