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
  },

  receiveListings: function (listings) {
    Dispatcher.dispatch({
      actionType: ListingConstants.RECEIVE_LISTINGS,
      listings: listings
    });
  }
};

module.exports = ListingActions;
