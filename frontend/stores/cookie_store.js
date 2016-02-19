var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    CookieConstants = require('../constants/cookie_constants');

var _cartListings = [];

var CookieStore = new Store(Dispatcher);

var addToCart = function (existingListings, newListing) {
  if (existingListings) {
    _cartListings = JSON.parse(existingListings);
  }
  _cartListings.push(newListing);
  window.localStorage.setItem("cartListings", JSON.stringify(_cartListings));
};

CookieStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CookieConstants.ADD_TO_CART:
      addToCart(payload.existingListings, payload.newListing);
      CookieStore.__emitChange();
      break;
  }
};

module.exports = CookieStore;
