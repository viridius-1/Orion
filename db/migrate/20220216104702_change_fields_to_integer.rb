class ChangeFieldsToInteger < ActiveRecord::Migration[6.0]
  def up
    change_column :objectives, :impressions,            :integer
    change_column :objectives, :frequency,              :integer
    change_column :objectives, :unique_reach,           :integer
    change_column :objectives, :video_plays,            :integer
    change_column :objectives, :conversions,            :integer
    change_column :objectives, :target_roas,            :integer
    change_column :objectives, :target_conversion_rate, :integer

  end

  def down
    change_column :objectives, :impressions,            :decimal
    change_column :objectives, :frequency,              :decimal
    change_column :objectives, :unique_reach,           :decimal
    change_column :objectives, :video_plays,            :decimal
    change_column :objectives, :conversions,            :decimal
    change_column :objectives, :target_roas,            :decimal
    change_column :objectives, :target_conversion_rate, :decimal
    change_column :objectives, :video_completion_rate,  :decimal
  end
end
