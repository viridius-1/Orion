class Audience::Provider < ApplicationRecord

  # has_many :categories, class_name: 'Audience::Category', dependent: :destroy
  # has_many :segments, class_name: 'Audience::Segment', through: :categories, dependent: :destroy

end
