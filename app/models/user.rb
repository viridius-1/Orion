class User < ApplicationRecord
  ############################################################################################
  ## PeterGate Roles                                                                        ##
  ## The :user role is added by default and shouldn't be included in this list.             ##
  ## The :root_admin can access any page regardless of access settings. Use with caution!   ##
  ## The multiple option can be set to true if you need users to have multiple roles.       ##
  petergate(roles: [:root_admin], multiple: false)                                      ##
  ############################################################################################

  belongs_to :company, polymorphic: true, optional: true

  after_create :refresh_token
  after_create :invite_user!
  # Include default devise modules. Others available are:
  # :registerable, :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable,
         :recoverable, :rememberable, :validatable

  has_many :connections

  validates :first_name, :last_name, :roles, :company, presence: true
  validates :email, presence: true, uniqueness: true

  def full_name
    "#{first_name} #{last_name}"
  end

  def advertisers
    @advertisers ||= 
      if company_type.downcase.to_sym == :agency
        company.advertisers
      else # == :advertiser
        [company]
      end
  end

  def agency_user?
    company_type.downcase.to_sym == :agency
  end

  def advertiser_user?
    company_type.downcase.to_sym == :advertiser
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

  # Send invitation to already created user.
  # invite! method from DeviseInvitable
  def invite_user!
    self.invite!
  end

  # Check if user is created in AdminPanel.
  # If we enable signup we should take care of this.
  def password_required?
    new_record? ? false : super
  end
end
