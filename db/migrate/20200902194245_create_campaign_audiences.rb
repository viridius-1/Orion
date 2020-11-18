class CreateCampaignAudiences < ActiveRecord::Migration[6.0]
  def change
    create_table :campaign_audiences do |t|
      t.integer :campaign_id
      t.integer :category_id
    end
  end
end
