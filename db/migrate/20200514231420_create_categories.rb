class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.integer :category_id
      t.boolean :has_audience
    end
  end
end
