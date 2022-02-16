class AddFrequencyUnitToObjectives < ActiveRecord::Migration[6.0]
  def change
    add_column :objectives, :frequency_unit, :string
  end
end
