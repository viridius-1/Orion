class DeleteCompanyMember < ActiveRecord::Migration[6.0]
  def change
    drop_table :company_members
  end
end
