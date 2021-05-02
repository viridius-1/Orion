class ChangeAdvertisersColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :advertisers, :client_count, :integer
    remove_column :advertisers, :preferred_service_level, :string
    remove_column :advertisers, :customer_target, :string
    remove_column :advertisers, :average_order_value, :decimal
    remove_column :advertisers, :conversion_rate, :decimal
    remove_column :advertisers, :cost_per_acquisition, :decimal
    remove_column :advertisers, :age_range_start, :integer
    remove_column :advertisers, :age_range_end, :integer
    remove_column :advertisers, :gender, :text
    remove_column :advertisers, :household_income, :text
    remove_column :advertisers, :parental_status, :text
    remove_column :advertisers, :education, :text
    remove_column :advertisers, :language, :text
    remove_column :advertisers, :affinity, :text
    remove_column :advertisers, :monthly_unique_visitors, :string

    rename_column :advertisers, :website, :website_url

    add_column :advertisers, :agency_id, :integer
    add_column :advertisers, :business_type, :string
    add_column :advertisers, :annual_revenue, :integer
    add_column :advertisers, :monthly_unique_visitors, :integer
  end
end
