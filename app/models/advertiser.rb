class Advertiser < ApplicationRecord
  serialize :current_media_mix, Array

  has_many :users, as: :company
  has_many :campaigns, dependent: :destroy

  belongs_to :agency, optional: true
  belongs_to :user, optional: true

  validates :name, presence: true
end
