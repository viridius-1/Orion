class AddColumnsToCampaignTable < ActiveRecord::Migration[6.0]
  def change
    add_column :campaigns, :coversion_rate, :float
    add_column :campaigns, :gender, :string, array: true, default: []
    add_column :campaigns, :average_order_value, :float
    add_column :campaigns, :age_range, :string, array: true, default: []
    add_column :campaigns, :education, :string
    add_column :campaigns, :parental_status, :string
    add_column :campaigns, :income, :string
  end
end
