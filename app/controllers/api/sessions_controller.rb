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
