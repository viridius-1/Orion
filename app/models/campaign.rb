class Campaign < ApplicationRecord
  serialize :geography, Array
  serialize :geo_fence, Array
  
  belongs_to :advertiser

  validates :name, presence: true

  enum status: {
    incomplete: 0,
    pending: 1,
    approved: 2
  }
end
