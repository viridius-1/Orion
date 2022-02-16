class RemoveObjectiveFieldsFromCampaign < ActiveRecord::Migration[6.0]
  def change
    remove_column :campaigns, :goal, :string
    remove_column :campaigns, :kpi, :string
    remove_column :campaigns, :conversion_rate, :decimal
    remove_column :campaigns, :average_order_value, :decimal
    remove_column :campaigns, :target_cpa, :decimal
    remove_column :campaigns, :target_roas, :decimal
    remove_column :campaigns, :budget, :decimal
    remove_column :campaigns, :pixel_notes, :text
  end
end
