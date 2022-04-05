class AddUploadCreativeCbxColumnToCampaign < ActiveRecord::Migration[6.0]
  def change
    add_column :campaigns, :is_creative_uploaded, :boolean, default: false
  end
end
