var Dispatcher = require('../dispatcher/dispatcher'),
    CookieConstants = require('../constants/cookie_constants');

var CookieActions = {
  addToCart: function (existingListings, newListing) {
    Dispatcher.dispatch({
      actionType: CookieConstants.ADD_TO_CART,
      existingListings: existingListings,
      newListing: newListing
    });
  },

  removeFromCart: function (id) {
    Dispatcher.dispatch({
      actionType: CookieConstants.REMOVE_FROM_CART,
      id: id
    });
  },

  checkout: function () {
    Dispatcher.dispatch({
      actionType: CookieConstants.CHECKOUT
    });
  }
};

module.exports = CookieActions;
