class AddMediaChannelToObjectives < ActiveRecord::Migration[6.0]
  def change
    add_column :objectives, :media_channel, :string
  end
end
