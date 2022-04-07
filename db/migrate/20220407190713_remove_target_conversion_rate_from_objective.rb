class RemoveTargetConversionRateFromObjective < ActiveRecord::Migration[6.0]
  def change
    remove_column :objectives, :target_conversion_rate
  end
end
