class CreateCampaigns < ActiveRecord::Migration[6.0]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.string :url
      t.date :flight_start_date
      t.date :flight_end_date
      t.string :goal
      t.string :kpi
      t.decimal :cpa_goal
      t.integer :roas_goal
      t.decimal :budget
      t.string :geography
      t.string :audience_targeting
      t.integer :advertiser_id

      t.timestamps
    end
  end
end
