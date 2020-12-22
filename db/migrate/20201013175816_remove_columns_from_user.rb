class RemoveColumnsFromUser < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :company
    remove_column :users, :user_type
    remove_column :users, :roles
  end
end
