class CreateListingImages < ActiveRecord::Migration
  def change
    create_table :listing_images do |t|
      t.integer :listing_id, null: false
      t.timestamps null: false
    end

    add_index :listing_images, [:listing_id]
  end
end
