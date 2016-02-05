json.extract! @shop, :user_id, :shop_name, :created_at
json.extract! @user, :id, :username, :email, :first_name, :last_name, :shop_owner,
  :created_at
json.image_url asset_path(@user.image.url)
