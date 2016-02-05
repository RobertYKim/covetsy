# Users
User.destroy_all
guest = User.create!(
  first_name: "Dev",
  last_name: "Eloper",
  username: "guest",
  email: "guest@gmail.com",
  password: "password",
  image: "https://s3.amazonaws.com/covetsy-seed/users/jonathan.jpg"
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
  shop_name: "gueststore",
  language_id: english.id,
  country_id: united_states.id,
  currency_id: usd.id,
  seller_type: "other"
)

# Listings
Listing.destroy_all
guest_listing_1 = Listing.create!(
  shop_id: guest_store.id,
  title: "Handmade boomerang",
  price: 59.99,
  quantity: 1,
  description: "Expertly crafted with responsibly sourced mahogany. Finished
    with a natural beeswax collected by the students of Apiary Academy."
)
