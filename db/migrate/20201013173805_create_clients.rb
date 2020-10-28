class CreateClients < ActiveRecord::Migration[6.0]
  def change
    create_table :clients do |t|
      t.string :name
      t.integer :agency_id
      t.text :website
      t.string :industry
      t.string  :preferred_service_level
      t.string  :customer_target
      t.string  :monthly_unique_visitors
      t.decimal :average_order_value
      t.decimal :conversion_rate
      t.decimal :cost_per_acquisition
      t.string  :current_media_mix
      t.integer :age_range_start
      t.integer :age_range_end
      t.text    :gender
      t.text    :household_income
      t.text    :parental_status
      t.text    :education
      t.text    :language
      t.text    :affinity

      t.timestamps
    end
  end
end
