class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user.nil?
      render json: ["Invalid username or password"], status: 401
    else
      sign_in(@user)
      render "api/users/show"
    end
  end

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end
  end

  def destroy
    sign_out
    render json: {}
  end
end
