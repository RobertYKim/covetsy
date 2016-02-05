class Listing < ActiveRecord::Base
  validates :shop_id, :title, :price, :quantity, :description, presence: true

  belongs_to :shop

end
