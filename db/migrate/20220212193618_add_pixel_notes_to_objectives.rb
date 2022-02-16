class AddPixelNotesToObjectives < ActiveRecord::Migration[6.0]
  def change
    add_column :objectives, :pixel_notes, :text
  end
end
