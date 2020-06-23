class User < ApplicationRecord
  ############################################################################################
  ## PeterGate Roles                                                                        ##
  ## The :user role is added by default and shouldn't be included in this list.             ##
  ## The :root_admin can access any page regardless of access settings. Use with caution!   ##
  ## The multiple option can be set to true if you need users to have multiple roles.       ##
  petergate(roles: [:root_admin], multiple: false)                                      ##
  ############################################################################################ 

  after_create :refresh_token
  validates :user_type, presence: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable, :confirmable,
         :recoverable, :rememberable, :validatable, :lockable

  has_many :connections
  has_many :advertisers

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
    session_token = connections.active.first.token
    "https://analytics.theversion2.com/app/dash/session/version2_login?token=#{session_token}"
  end
end
