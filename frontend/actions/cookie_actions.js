var Dispatcher = require('../dispatcher/dispatcher'),
    CookieConstants = require('../constants/cookie_constants');

var CookieActions = {
  addToCart: function (existingListings, newListing) {
    Dispatcher.dispatch({
      actionType: CookieConstants.ADD_TO_CART,
      existingListings: existingListings,
      newListing: newListing
    });
  }
};

module.exports = CookieActions;
