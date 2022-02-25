class AddAudienceNotesToCampaign < ActiveRecord::Migration[6.0]
  def change
    add_column :campaigns, :audience_notes, :text
  end
end
