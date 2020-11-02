class RemoveOutdatedAdvertierserRelatedColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :advertisers, :is_agency
    remove_column :campaigns, :advertiser_id
  end
end
