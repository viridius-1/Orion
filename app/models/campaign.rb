class Campaign < ApplicationRecord
  serialize :geography, Array
  serialize :geo_fence, Array
  
  belongs_to :advertiser

  validates :name, presence: true
end
