class AddIndexToAudiences < ActiveRecord::Migration[6.0]
  def change
    add_index :audiences, :category_id
  end
end
