class ChangeCampaignStatusToInteger < ActiveRecord::Migration[6.0]
  def up
    change_column :campaigns, :status, :integer, null: false, default: 0, using: 0
  end

  def down
    change_column :campaigns, :status, :string
  end
end
