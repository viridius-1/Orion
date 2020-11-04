class CreateAudienceSegments < ActiveRecord::Migration[6.0]
  def change
    create_table :audience_segments do |t|
      t.string :name
      t.text :description
      t.integer :category_id
      t.timestamps
    end
  end
end
