class UpdateAdvertiserNameColumn < ActiveRecord::Migration[6.0]
  def change
    rename_column :advertisers, :company_name, :name
  end
end
