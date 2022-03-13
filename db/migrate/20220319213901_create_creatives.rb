class CreateCreatives < ActiveRecord::Migration[6.0]
  def change
    create_table :creatives do |t|
      t.string :file
      t.references :campaign, index: true

      t.timestamps
    end
  end
end
