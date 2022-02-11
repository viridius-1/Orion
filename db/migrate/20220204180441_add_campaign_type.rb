class AddCampaignType < ActiveRecord::Migration[6.0]
  def change
    add_column :campaigns, :campaign_type, :integer, null: false, default: 0
  end
end
