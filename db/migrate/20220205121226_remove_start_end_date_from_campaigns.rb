class RemoveStartEndDateFromCampaigns < ActiveRecord::Migration[6.0]
  def change
    remove_column :campaigns, :start_date, :date
    remove_column :campaigns, :end_date, :date
  end
end
