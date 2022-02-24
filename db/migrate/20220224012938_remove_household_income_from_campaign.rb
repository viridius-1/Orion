class RemoveHouseholdIncomeFromCampaign < ActiveRecord::Migration[6.0]
  def change
    remove_column :campaigns, :household_income
  end
end
