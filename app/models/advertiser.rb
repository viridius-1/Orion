class Advertiser < ApplicationRecord
  serialize :current_media_mix, Array

  has_many :company_members, as: :company
  has_many :users, through: :company_members
  has_many :company_campaigns, as: :company
  has_many :campaigns, through: :company_campaigns

  belongs_to :agency, optional: true
  belongs_to :user, optional: true

  validates :name, presence: true
end
