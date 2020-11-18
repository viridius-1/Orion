class Audience::Provider < ApplicationRecord
  has_many :categories, class_name: 'Audience::Category', dependent: :destroy

  validates :name, presence: true
end
