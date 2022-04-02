class RemoveConversionsFromObjectives < ActiveRecord::Migration[6.0]
  def change
    remove_column :objectives, :conversions, :integer
  end
end
