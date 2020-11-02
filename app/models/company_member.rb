class CompanyMember < ApplicationRecord
  ############################################################################################
  ## PeterGate Roles                                                                        ##
  ## The :user role is added by default and shouldn't be included in this list.             ##
  ## The :root_admin can access any page regardless of access settings. Use with caution!   ##
  ## The multiple option can be set to true if you need users to have multiple roles.       ##
  petergate(roles: [:root_admin], multiple: false)                                      ##
  ############################################################################################

  belongs_to :company, polymorphic: true, optional: true
  belongs_to :user, optional: true
end
