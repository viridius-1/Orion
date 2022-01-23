class AddAdditionalFieldsToCampaign < ActiveRecord::Migration[6.0]
  def change
    add_column :campaigns, :geo_fence, :string
    add_column :campaigns, :footfall_analysis, :bool, null: false, default: false
    add_column :campaigns, :crm_data, :bool, null: false, default: false
    add_column :campaigns, :contextual_targeting, :bool, null: false, default: false
    add_column :campaigns, :brand_safety, :bool, null: false, default: false
    add_column :campaigns, :targeting_notes, :text
  end
end
