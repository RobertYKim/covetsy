var Dispatcher = require('../dispatcher/dispatcher'),
    ListingConstants = require('../constants/listing_constants');

var ListingActions = {
  receiveListing: function (listing) {
    Dispatcher.dispatch({
      actionType: ListingConstants.RECEIVE_LISTING,
      listing: listing
    });
  }
};

module.exports = ListingActions;
