class Campaign < ApplicationRecord
  serialize :geography, Array
  belongs_to :advertiser

  validates :name, presence: true
end
