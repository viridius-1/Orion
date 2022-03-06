class AddObjectiveNotesToObjectives < ActiveRecord::Migration[6.0]
  def change
    add_column :objectives, :objective_notes, :text
  end
end
