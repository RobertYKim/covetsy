json.extract! @user, :id, :username, :first_name, :last_name, :shop_owner,
  :created_at
json.image_url asset_path(@user.image.url)
if @shop
  json.extract! @shop, :shop_name
end
