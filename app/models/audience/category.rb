class Audience::Category < ApplicationRecord
  belongs_to :provider, class_name: 'Audience::Provider'
  belongs_to :parent, class_name: 'Audience::Category', optional: true, foreign_key: :category_id

  has_many :children, class_name: 'Audience::Category', dependent: :destroy
  has_many :segments, class_name: 'Audience::Segment'

  validates :name, presence: true
end
