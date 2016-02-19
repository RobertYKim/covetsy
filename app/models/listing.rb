class Listing < ActiveRecord::Base
  validates :shop_id, :title, :price, :quantity, :description, presence: true

  belongs_to :shop
  has_many :listing_images, dependent: :destroy
  has_one :user, through: :shop
end
