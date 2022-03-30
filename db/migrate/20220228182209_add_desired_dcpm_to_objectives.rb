class AddDesiredDcpmToObjectives < ActiveRecord::Migration[6.0]
  def change
    add_column :objectives, :desired_dcpm, :decimal
  end
end
