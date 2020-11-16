class CreateAudienceCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :audience_categories do |t|
      t.string :name
      t.integer :provider_id
      t.integer :category_id

      t.timestamps
    end
  end
end
