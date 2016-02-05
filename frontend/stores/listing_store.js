var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    ListingConstants = require('../constants/listing_constants');

var _listingHasBeenFetched = false;
var _listing;

var ListingStore = new Store(Dispatcher);

ListingStore.listing = function () {
  return _listing;
};

ListingStore.listingHasBeenFetched = function () {
  return _listingHasBeenFetched;
};

ListingStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ListingConstants.RESET_LISTING:
      _listing = {};
      _listingHasBeenFetched = false;
      break;
    case ListingConstants.RECEIVE_LISTING:
      _listing = payload.listing;
      _listingHasBeenFetched = true;
      ListingStore.__emitChange();
      break;
  }
};

module.exports = ListingStore;
