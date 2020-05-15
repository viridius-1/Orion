class Category < ApplicationRecord
  belongs_to :parent, class_name: 'Category', optional: true, foreign_key: :category_id
  has_many :children, class_name: 'Category', dependent: :destroy
  has_many :audiences, dependent: :destroy
  scope :root, -> { where(category_id: nil).order(:name) }
end
