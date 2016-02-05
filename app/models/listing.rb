class Listing < ActiveRecord::Base
  validates :user_id, :title, :price, :quantity, :description, presence: true

  belongs_to :shop
  
end
