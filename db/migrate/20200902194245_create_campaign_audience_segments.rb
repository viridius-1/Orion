class CreateCampaignAudienceSegments < ActiveRecord::Migration[6.0]
  def change
    create_table :campaign_audience_segments do |t|
      t.integer :campaign_id
      t.integer :segment_id
    end
  end
end
