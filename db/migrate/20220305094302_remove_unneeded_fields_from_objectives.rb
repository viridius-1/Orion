class RemoveUnneededFieldsFromObjectives < ActiveRecord::Migration[6.0]
  def change
    remove_column :objectives, :impressions, :integer
    remove_column :objectives, :video_plays, :integer
    remove_column :objectives, :frequency, :integer
    remove_column :objectives, :frequency_unit, :string
    remove_column :objectives, :unique_reach, :integer
  end
end
