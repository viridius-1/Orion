class AddPixelNotesToCampaign < ActiveRecord::Migration[6.0]
  def change
    add_column :campaigns, :pixel_notes, :text
  end
end
