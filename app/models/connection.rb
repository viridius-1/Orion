class Connection < ApplicationRecord
  belongs_to :user
  before_create :generate_token!
  scope :active, -> { where(expired_at: nil) }

  def generate_token!
    # Expire any active tokens before creating a new one
    user.expire_tokens!
    # Create a new token while ensuring that one doesn't already exist of the same value.
    begin
      self.token = Devise.friendly_token
    end while self.class.exists?(token: token)
  end
end
