class Api::ListingsController < ApplicationController
  def create
    if current_user.shop.id == params[:listing][:shop_id].to_i
      @listing = Listing.new(listing_params)
    else
      render json: ["Cannot create listings for other shops."], status: 403
    end

    if @listing.save
      @image = ListingImage.new({
        listing_id: @listing.id,
        image: params[:listing][:image]
      })
      if @image.save
        render :show
      end
    else
      render json: [@listing.errors.full_messages], status: 422
    end
  end

  def show
    @listing = Listing.find(params[:id])
    @listing_images = @listing.listing_images
    @shop = @listing.shop
    @user = @listing.user
    if @listing
      render :show
    else
      render json: ["Listing not found"], status: 404
    end
  end

  def index
    @listings =
      Listing.all.includes(:shop).includes(:listing_images)

    if @listings
      render :index
    else
      render json: ["Listings not found"], status: 404
    end
  end

  private

  def listing_params
    params.require(:listing).permit(
      :shop_id,
      :title,
      :price,
      :quantity,
      :description
    )
  end
end
