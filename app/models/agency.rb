class Agency < ApplicationRecord
  has_many :company_members, as: :company
  has_many :users, through: :company_members
  has_many :clients

  validates :name, presence: true
end