class Agency < ApplicationRecord
  has_many :users, as: :company
  has_many :advertisers

  validates :name, presence: true
end
