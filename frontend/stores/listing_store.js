var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    ListingConstants = require('../constants/listing_constants');

var _listingHasBeenFetched = false;
var _listingsHaveBeenFetched = false;
var _listing;
var _listings;

var ListingStore = new Store(Dispatcher);

ListingStore.listing = function () {
  return _listing;
};

ListingStore.listingHasBeenFetched = function () {
  return _listingHasBeenFetched;
};

ListingStore.listings = function () {
  return _listings;
};

ListingStore.listingsHaveBeenFetched = function () {
  return _listingsHaveBeenFetched;
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
    case ListingConstants.RECEIVE_LISTINGS:
      _listings = payload.listings;
      _listingsHaveBeenFetched = true;
      ListingStore.__emitChange();
      break;
  }
};

module.exports = ListingStore;
