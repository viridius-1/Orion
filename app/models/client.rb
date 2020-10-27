class Client < ApplicationRecord
  belongs_to :agency, optional: true

  has_many :company_campaigns, as: :company
  has_many :campaigns, through: :company_campaigns

  validates :name, presence: true
end
