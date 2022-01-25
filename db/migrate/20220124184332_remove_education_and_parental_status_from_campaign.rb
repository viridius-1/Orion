class RemoveEducationAndParentalStatusFromCampaign < ActiveRecord::Migration[6.0]
  def change
    remove_column :campaigns, :education
    remove_column :campaigns, :parental_status
  end
end
