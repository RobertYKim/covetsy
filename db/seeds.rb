# Users
User.destroy_all
guest = User.create!(
  first_name: "Dev",
  last_name: "Eloper",
  username: "guest",
  email: "guest@gmail.com",
  password: "password",
  image: "https://s3.amazonaws.com/covetsy-seed/users/jonathan.jpg",
  shop_owner: true
)
robert = User.create!(
  first_name: "Robert",
  last_name: "Kim",
  username: "robert",
  email: "robert@gmail.com",
  password: "robertrobert",
  image: "https://s3.amazonaws.com/covetsy-seed/users/robert.jpg"
)
tommy = User.create!(
  first_name: "Tommy",
  last_name: "Duek",
  username: "tommy",
  email: "tommy@gmail.com",
  password: "tommytommy",
  image: "https://s3.amazonaws.com/covetsy-seed/users/tommy.jpg"
)
lily = User.create!(
  first_name: "Lily",
  last_name: "Riopelle",
  username: "lily",
  email: "lily@gmail.com",
  password: "lilylily",
  image: "https://s3.amazonaws.com/covetsy-seed/users/lily.jpg"
)
fred = User.create!(
  first_name: "Fred",
  last_name: "Sladkey",
  username: "fred",
  email: "fred@gmail.com",
  password: "fredfred",
  image: "https://s3.amazonaws.com/covetsy-seed/users/fred.jpg"
)
carl = User.create!(
  first_name: "Carl",
  last_name: "Baron",
  username: "carl",
  email: "carl@gmail.com",
  password: "carlcarl",
  image: "https://s3.amazonaws.com/covetsy-seed/users/carl.jpg"
)
dan = User.create!(
  first_name: "Dan",
  last_name: "Cherouny",
  username: "danc",
  email: "dan@gmail.com",
  password: "dandan",
  image: "https://s3.amazonaws.com/covetsy-seed/users/dan.jpg"
)
frankie = User.create!(
  first_name: "Frankie",
  last_name: "Simms",
  username: "frankie",
  email: "frankie@gmail.com",
  password: "frankiefrankie",
  image: "https://s3.amazonaws.com/covetsy-seed/users/frankie.jpg"
)

# Languages
Language.destroy_all
german = Language.create!(name: "german")
english = Language.create!(name: "english")
spanish = Language.create!(name: "spanish")
french = Language.create!(name: "french")
italian = Language.create!(name: "italian")
japanese = Language.create!(name: "japanese")
dutch = Language.create!(name: "dutch")
portugese = Language.create!(name: "portugese")
russian = Language.create!(name: "russian")

# Countries
Country.destroy_all
australia = Country.create!(name: "australia")
canada = Country.create!(name: "canada")
france = Country.create!(name: "france")
germany = Country.create!(name: "germany")
greece = Country.create!(name: "greece")
ireland = Country.create!(name: "ireland")
italy = Country.create!(name: "italy")
japan = Country.create!(name: "japan")
new_zealand = Country.create!(name: "newZealand")
russia = Country.create!(name: "russia")
spain = Country.create!(name: "spain")
the_netherlands = Country.create!(name: "theNetherlands")
united_kingdom = Country.create!(name: "unitedKingdom")
united_states = Country.create!(name: "unitedStates")

# Currencies
Currency.destroy_all
usd = Currency.create!(name: "usd")
cad = Currency.create!(name: "cad")
eur = Currency.create!(name: "eur")
gbp = Currency.create!(name: "gbp")
aud = Currency.create!(name: "aud")
jpy = Currency.create!(name: "jpy")

# Shops
Shop.destroy_all
guest_store = Shop.create!(
  user_id: guest.id,
  shop_name: "dutchdesign",
  language_id: english.id,
  country_id: united_states.id,
  currency_id: usd.id,
  seller_type: "other"
)
robert_store = Shop.create!(
  user_id: robert.id,
  shop_name: "CraftCoding",
  language_id: english.id,
  country_id: united_states.id,
  currency_id: usd.id,
  seller_type: "other"
)
lily_store = Shop.create!(
  user_id: lily.id,
  shop_name: "pots",
  language_id: english.id,
  country_id: united_states.id,
  currency_id: usd.id,
  seller_type: "other"
)

# Listings
Listing.destroy_all
guest_listing_1 = Listing.create!(
  shop_id: guest_store.id,
  title: "Cutting Boards: Set of Three",
  price: 59.99,
  quantity: 1,
  description: "Expertly crafted with responsibly sourced walnut, teak, and
    mahogany. Finished with a natural beeswax from Apiary Academy."
)
guest_listing_2 = Listing.create!(
  shop_id: guest_store.id,
  title: "Candle Sticks: Set of Two",
  price: 49.99,
  quantity: 1,
  description: "Bring warmth to your space with these vintage-inspired brass
    candle sticks! Made in a workshop powered exclusively with solar energy."
)
guest_listing_3 = Listing.create!(
  shop_id: guest_store.id,
  title: "Post-Post-Modern Chandelier",
  price: 199.99,
  quantity: 1,
  description: "One-of-a-kind chandelier made with 100% post-consumer
    materials. Edison bulbs not included."
)
guest_listing_4 = Listing.create!(
  shop_id: guest_store.id,
  title: "Perforated Toolbox",
  price: 29.99,
  quantity: 1,
  description: "Keep all your tools organized with this toolbox! Just don't
    put anything small in it because it will fall out! Body is made from
    recycled aluminum cans and handle is white oak from reclaimed Dutch East
    India Company ship hulls. Own a piece of history today!"
)
guest_listing_5 = Listing.create!(
  shop_id: guest_store.id,
  title: "Cork Stool",
  price: 119.99,
  quantity: 1,
  description: "Comfortable stool with a cork seat and brushed aluminum legs."
)
guest_listing_6 = Listing.create!(
  shop_id: guest_store.id,
  title: "Handmade Square Basket",
  price: 49.99,
  quantity: 1,
  description: "Weaved using traditional under water techniques. Measures 1 x
    1 x 1 foot."
)
robert_listing_1 = Listing.create!(
  shop_id: robert_store.id,
  title: "React Paper Ornament",
  price: 9.99,
  quantity: 1,
  description: "Hand cut paper ornament in the style of the React logo."
)
robert_listing_2 = Listing.create!(
  shop_id: robert_store.id,
  title: "Flux Paper Ornament",
  price: 9.99,
  quantity: 1,
  description: "Hand cut paper ornament in the style of the Flux logo."
)
robert_listing_3 = Listing.create!(
  shop_id: robert_store.id,
  title: "JavaScript Paper Ornament",
  price: 9.99,
  quantity: 1,
  description: "Hand cut paper ornament in the style of the JavaScript logo."
)
robert_listing_4 = Listing.create!(
  shop_id: robert_store.id,
  title: "Ruby Paper Ornament",
  price: 9.99,
  quantity: 1,
  description: "Hand cut paper ornament in the style of the Ruby logo."
)
lily_listing_1 = Listing.create!(
  shop_id: lily_store.id,
  title: "Blushing Red Head Pot",
  price: 7.99,
  quantity: 1,
  description: "White ceramic pot with hand-drawn illustration. Great for house
    plants!"
)
lily_listing_2 = Listing.create!(
  shop_id: lily_store.id,
  title: "Purple Teardrop Votive",
  price: 5.99,
  quantity: 1,
  description: "White ceramic cup with hand-drawn purple teardrop design. Great
    for votives or tiny house plants!"
)


# Listing Images
ListingImage.destroy_all
guest_listing_1_image = ListingImage.create!(
  listing_id: guest_listing_1.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/cuttingboards.jpg"
)
guest_listing_2_image = ListingImage.create!(
  listing_id: guest_listing_2.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/candlesticks.jpg"
)
guest_listing_3_image = ListingImage.create!(
  listing_id: guest_listing_3.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/chandelier.jpg"
)
guest_listing_4_image = ListingImage.create!(
  listing_id: guest_listing_4.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/toolbox.jpg"
)
guest_listing_5_image = ListingImage.create!(
  listing_id: guest_listing_5.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/stool.jpg"
)
guest_listing_6_image = ListingImage.create!(
  listing_id: guest_listing_6.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/basket.jpg"
)
robert_listing_1_image = ListingImage.create!(
  listing_id: robert_listing_1.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/react.jpg"
)
robert_listing_2_image = ListingImage.create!(
  listing_id: robert_listing_2.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/flux.jpg"
)
robert_listing_3_image = ListingImage.create!(
  listing_id: robert_listing_3.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/js.jpg"
)
robert_listing_4_image = ListingImage.create!(
  listing_id: robert_listing_4.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/ruby.jpg"
)
lily_listing_1_image = ListingImage.create!(
  listing_id: lily_listing_1.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/pot.jpg"
)
lily_listing_1_image = ListingImage.create!(
  listing_id: lily_listing_2.id,
  image: "https://s3.amazonaws.com/covetsy-seed/listings/votive.jpg"
)
