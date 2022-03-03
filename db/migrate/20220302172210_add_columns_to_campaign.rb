class AddColumnsToCampaign < ActiveRecord::Migration[6.0]
  def change
    add_column :campaigns, :footfall_analysis_text, :text
    add_column :campaigns, :crm_data_checked, :boolean, default: false
    add_column :campaigns, :brand_safety_text, :text
    add_column :campaigns, :contextual_targeting_text, :text
  end
end
