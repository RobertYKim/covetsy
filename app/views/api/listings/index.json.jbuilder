json.listings @listings do |listing|
  json.extract! listing, :id, :shop_id, :title, :price
  json.shop_name listing.shop.shop_name
  json.listing_images listing.listing_images do |listing_image|
    json.image_url asset_path(listing_image.image.url)
  end
end
