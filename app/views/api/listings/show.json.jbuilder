json.extract! @listing, :id, :shop_id, :title, :price, :quantity, :description
json.image_url asset_path(@listing.image.url)
