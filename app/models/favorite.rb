class Favorite < ApplicationRecord
  belongs_to :user 
  belongs_to :audience
  validates :user_id, uniqueness: { scope: :audience_id }
end