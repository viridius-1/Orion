class CreateCompanyMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :company_members do |t|
      t.integer :company_id
      t.string :company_type
      t.integer :user_id
      t.string :roles

      t.timestamps
    end
  end
end
