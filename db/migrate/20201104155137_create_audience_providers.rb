class CreateAudienceProviders < ActiveRecord::Migration[6.0]
  def change
    create_table :audience_providers do |t|
      t.string :name

      t.timestamps
    end
  end
end
