class CreateAudiences < ActiveRecord::Migration[6.0]
  def change
    create_table :audiences do |t|
      t.string :name
      t.text :description
      t.integer :audience_id

      t.timestamps
    end
  end
end
