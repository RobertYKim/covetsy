class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user.nil?
      flash.now[:errors] = ["Invalid username or password"]
    else
      sign_in(@user)
      redirect_to root_url
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end
end
