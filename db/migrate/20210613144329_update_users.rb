class UpdateUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :roles, :string
    add_column :users, :company_id, :integer
    add_column :users, :company_type, :string
  end
end
