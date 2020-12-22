class CreateCompanyCampaigns < ActiveRecord::Migration[6.0]
  def change
    create_table :company_campaigns do |t|
      t.integer :company_id
      t.string :company_type
      t.integer :campaign_id

      t.timestamps
    end
  end
end
