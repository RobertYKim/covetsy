class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render :show
    else
      render json: [@user.errors.full_messages], status: 422
    end
  end

  def show
    @user = User.find_by_username(params[:id])
    if @user.shop_owner
      @shop = @user.shop
    end

    if @user
      render :show
    else
      render json: [@user.errors.full_messages], status: 404
    end
  end

  def update
    @user = current_user
    if params[:user]
      if @user.update(user_params)
        render :show
      else
        render json: [@user.errors.full_messages], status: 422
      end
    else
      render json: ["No updates"], status: 200
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email,
      :username,
      :password,
      :first_name,
      :last_name,
      :gender,
      :image,
      :cart
    )
  end
end
