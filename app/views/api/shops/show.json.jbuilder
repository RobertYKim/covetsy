json.extract! @shop, :id, :user_id, :shop_name, :created_at
json.extract! @user, :username, :email, :first_name, :last_name, :shop_owner,
  :created_at
json.image_url asset_path(@user.image.url)

json.listings @listings do |listing|
  json.id listing.id
  json.title listing.title
  json.price listing.price
  json.listing_images listing.listing_images do |listing_image|
    json.image_url asset_path(listing_image.image.url)
  end
end
