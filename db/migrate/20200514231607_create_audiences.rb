class CreateAudiences < ActiveRecord::Migration[6.0]
  def change
    create_table :audiences do |t|
      t.string :name
      t.text :description
      t.string :provider
      t.integer :category_id
    end
  end
end
