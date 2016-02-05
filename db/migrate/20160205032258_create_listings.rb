class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.integer :shop_id, null: false
      t.string :title, null: false
      t.float :price, null: false
      t.integer :quantity, null: false
      t.text :description, null: false
      t.timestamps null: false
    end

  add_index :listings, [:shop_id]
  end
end
