class Advertiser < ApplicationRecord
  serialize :current_media_mix, Array

  has_many :company_members, as: :company
  has_many :users, through: :company_members
  has_many :campaigns, dependent: :destroy

  belongs_to :agency, optional: true
  belongs_to :user, optional: true

  validates :name, presence: true
end
