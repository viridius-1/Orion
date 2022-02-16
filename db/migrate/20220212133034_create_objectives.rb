class CreateObjectives < ActiveRecord::Migration[6.0]
  def change
    create_table :objectives do |t|
      t.string  :goal
      t.string  :kpi
      t.decimal :impressions
      t.decimal :frequency
      t.decimal :unique_reach
      t.decimal :target_ctr
      t.decimal :video_plays
      t.decimal :video_completion_rate
      t.decimal :conversions
      t.decimal :target_conversion_rate
      t.decimal :target_cpa
      t.decimal :average_order_value
      t.decimal :target_roas
      t.decimal :budget
      t.date :start_date
      t.date :end_date
      t.references :campaign, null: false, foreign_key: true

      t.timestamps
    end
  end
end
