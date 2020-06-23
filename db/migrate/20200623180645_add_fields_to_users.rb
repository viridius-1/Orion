class AddFieldsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :user_type, :string
    add_column :users, :profile_created, :boolean, default: false
  end
end
