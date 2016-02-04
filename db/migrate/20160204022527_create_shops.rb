class CreateShops < ActiveRecord::Migration
  def change
    create_table :shops do |t|
      t.integer :user_id, null: false
      t.string :shop_name, null: false
      t.integer :language_id, null: false
      t.integer :country_id, null: false
      t.integer :currency_id, null: false
      t.string :seller_type, null: false
      t.timestamps null: false
    end

  add_index :shops, [:user_id, :shop_name], unique: true
  end
end
