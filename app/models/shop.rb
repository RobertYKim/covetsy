class Shop < ActiveRecord::Base
  validates :shop_name, :language_id, :country_id, :currency_id, :seller_type,
    presence: true
  validates :shop_name, :user_id, uniqueness: true
  validates :shop_name, length: { minimum: 4, maximum: 20 }

  after_initialize :lookup_language, :lookup_country, :lookup_currency

  private

  def lookup_language
    language_id = Language.find_by(name: language).id
  end

  def lookup_country
    country_id = Country.find_by(name: country).id
  end

  def lookup_currency
    currency_id = Currency.find_by(name: currency).id
  end
  
end
