var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    CookieConstants = require('../constants/cookie_constants');

var _cartListings = {};

var CookieStore = new Store(Dispatcher);

var addToCart = function (existingListings, newListing) {
  if (existingListings) {
    _cartListings = JSON.parse(existingListings);
  }
  var id = newListing.listingId;
  var quantity = newListing.quantity;
  var max = newListing.max;
  if (_cartListings[id]) {
    if (_cartListings[id] + quantity <= max) {
      _cartListings[id] += quantity;
    }
  } else {
    _cartListings[id] = quantity;
  }

  window.localStorage.setItem("cartListings", JSON.stringify(_cartListings));
};

var removeFromCart = function (id) {
  var listings = JSON.parse(window.localStorage.cartListings);
  delete listings[id];

  _cartListings = listings;
  if (Object.keys(_cartListings).length === 0) {
    window.localStorage.removeItem("cartListings");
  } else {
    window.localStorage.setItem("cartListings", JSON.stringify(_cartListings));
  }
};

var checkout = function () {
  _cartListings = {};
  window.localStorage.removeItem("cartListings");
};

var updateCart = function (listings) {
  _cartListings = JSON.parse(listings);
  window.localStorage.setItem("cartListings", listings);
};

CookieStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CookieConstants.ADD_TO_CART:
      addToCart(payload.existingListings, payload.newListing);
      CookieStore.__emitChange();
      break;
    case CookieConstants.REMOVE_FROM_CART:
      removeFromCart(payload.id);
      CookieStore.__emitChange();
      break;
    case CookieConstants.CHECKOUT:
      checkout();
      CookieStore.__emitChange();
      break;
    case CookieConstants.UPDATE_CART:
      updateCart(payload.listings);
      CookieStore.__emitChange();
      break;
  }
};

module.exports = CookieStore;
