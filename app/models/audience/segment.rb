class Audience::Segment < ApplicationRecord
  belongs_to :category, class_name: 'Audience::Category', optional: true
  has_one :provider, class_name: 'Audience::Provider', through: :category, dependent: :destroy

  validates :name, presence: true
end
