class Shop < ActiveRecord::Base
  validates :shop_name, :language_id, :country_id, :currency_id, :seller_type,
    presence: true
  validates :shop_name, :user_id, uniqueness: true
  validates :shop_name, length: { minimum: 4, maximum: 20 }

  belongs_to :user

  def language=(language)
    self.language_id = Language.find_by(name: language).id
  end

  def country=(country)
    self.country_id = Country.find_by(name: country).id
  end

  def currency=(currency)
    self.currency_id = Currency.find_by(name: currency).id
  end

end
