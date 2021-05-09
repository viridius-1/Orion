class ChangeCampaignColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :campaigns, :age_range, :string, array: true
    remove_column :campaigns, :gender, :string, array: true
    remove_column :campaigns, :income, :string
    remove_column :campaigns, :audience_targeting, :string

    rename_column :campaigns, :flight_start_date, :start_date
    rename_column :campaigns, :flight_end_date, :end_date
    rename_column :campaigns, :url, :campaign_url
    rename_column :campaigns, :cpa_goal, :target_cpa
    rename_column :campaigns, :roas_goal, :target_roas

    add_column :campaigns, :advertiser_id, :integer
    add_column :campaigns, :conversion_rate, :decimal
    add_column :campaigns, :age_range_male, :integer, array: true
    add_column :campaigns, :age_range_female, :integer, array: true
    add_column :campaigns, :household_income, :integer, array: true
    add_column :campaigns, :affinities, :jsonb
    add_column :campaigns, :status, :string
    add_column :campaigns, :languages, :string
    add_column :campaigns, :budget_used, :integer
  end
end
