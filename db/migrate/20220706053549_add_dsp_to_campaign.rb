class AddDspToCampaign < ActiveRecord::Migration[6.0]
  def change
    add_column :campaigns, :demand_side_platform, :string
  end
end
