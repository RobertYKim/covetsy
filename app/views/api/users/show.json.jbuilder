json.extract! @user, :username, :first_name, :last_name, :created_at, :id
json.image_url asset_path(@user.image.url)
