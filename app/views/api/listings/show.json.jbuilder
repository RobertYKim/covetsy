json.extract! @listing, :id, :shop_id, :title, :price, :quantity, :description
json.user_id @user.id
json.shop_name @shop.shop_name
json.listing_images @listing_images do |listing_image|
  json.image_url asset_path(listing_image.image.url)
end
