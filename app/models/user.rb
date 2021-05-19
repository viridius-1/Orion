class User < ApplicationRecord
  after_create :refresh_token
  # Include default devise modules. Others available are:
  # :registerable, :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable, :confirmable,
         :recoverable, :rememberable, :validatable, :lockable

  has_one :company_member, dependent: :destroy
  has_many :connections

  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true

  def full_name
    "#{first_name} #{last_name}"
  end

  def invite_status
    if invitation_accepted_at
      'accepted'
    elsif invitation_sent_at && invitation_accepted_at.nil?
      'invited'
    else
      'manual'
    end
  end

  def expire_tokens!
    connections.active.update_all(expired_at: Time.now)
  end

  def refresh_token
    expire_tokens!
    connections.create
  end

  def token_url
    session_token = connections&.active&.first&.token
    "https://analytics.theversion2.com/app/dash/session/version2_login?token=#{session_token}"
  end

  def company
    company_member.company
  end

  def company_type
    company_member.company_type
  end
end
