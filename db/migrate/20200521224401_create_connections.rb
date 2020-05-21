class CreateConnections < ActiveRecord::Migration[6.0]
  def change
    create_table :connections do |t|
      t.integer :user_id
      t.string :token
      t.boolean :is_expired, default: false
      t.datetime :expired_at

      t.timestamps
    end
  end
end
