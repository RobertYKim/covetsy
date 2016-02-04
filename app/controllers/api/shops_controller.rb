class Api::ShopsController < ApplicationController
  def create
    @shop = Shop.new(shop_params)
    if @shop.save
      render :show
    else
      render json [@shop.errors.full_messages], status: 422
    end
  end

  def show
    @shop = Shop.find_by_shop_name(params[:shop_name])
    if @shop
      render :show
    else
      render json: ["User not found"], status: 404
    end
  end

  def exists
    @shop = Shop.find_by_shop_name(params[:shop_name])
    if @shop
      render json: ["true"]
    else
      render json: ["false"]
    end
  end

  private

  def shop_params
    params.require(:shop).permit(
      :user_id,
      :shop_name,
      :language,
      :country,
      :currency,
      :seller_type
    )
  end
end
