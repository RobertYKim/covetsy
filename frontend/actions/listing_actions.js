var Dispatcher = require('../dispatcher/dispatcher'),
    ListingConstants = require('../constants/listing_constants');

var ListingActions = {
  resetListing: function () {
    Dispatcher.dispatch({
      actionType: ListingConstants.RESET_LISTING
    });
  },

  receiveListing: function (listing) {
    Dispatcher.dispatch({
      actionType: ListingConstants.RECEIVE_LISTING,
      listing: listing
    });
  }
};

module.exports = ListingActions;
