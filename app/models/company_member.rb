class CompanyMember < ApplicationRecord
  belongs_to :company, polymorphic: true, optional: true
  belongs_to :user, optional: true
end
