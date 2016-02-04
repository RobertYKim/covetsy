class Api::ShopsController < ApplicationController
  def create
    @shop = Shop.new(shop_params)
    if @shop.save
      render :show
    else
      render json [@shop.errors.full_messages], status: 422
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
