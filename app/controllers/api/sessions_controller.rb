class Api::SessionsController < ApplicationController
  def create
    identfier = params[:user][:email_or_username]
    if (/@/ =~ identfier).nil?
      @user = User.find_by_username_and_password(
      params[:user][:email_or_username],
      params[:user][:signin_password]
      )
    else
      @user = User.find_by_email_and_password(
      params[:user][:email_or_username],
      params[:user][:signin_password]
      )
    end

    if @user.nil?
      render json: ["Invalid email, username or password"], status: 401
    else
      sign_in(@user)
      @shop = @user.shop
      updatedCookie = reconcile_cookie
      @user.update(cart: updatedCookie)
      render "api/users/show"
    end
  end

  def show
    if current_user
      @user = current_user
      @shop = @user.shop
      render "api/users/show"
    else
      render json: {}
    end
  end

  def destroy
    sign_out
    render json: {}
  end

  def reconcile_cookie
    if params[:user][:cartListings].nil? || params[:user][:cartListings] == ""
      local_cart = {}
    else
      local_cart = JSON.parse(params[:user][:cartListings])
    end

    if @user.cart.nil? || @user.cart == ""
      user_cart = {}
    else
      user_cart = JSON.parse(@user.cart)
    end

    result = user_cart.merge(local_cart)
    result.to_json
  end

  def omniauth_facebook
    @user = User.find_or_create_by_auth_hash(auth_hash)
    sign_in(@user)
    redirect_to root_url + '#/'
  end

  def omniauth_google
    @user = User.find_or_create_by_auth_hash(auth_hash)
    sign_in(@user)
    redirect_to root_url + '#/'
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end
end
