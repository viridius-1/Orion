class Campaign < ApplicationRecord
  belongs_to :advertiser

  validates :name, :advertiser, presence: true
end
