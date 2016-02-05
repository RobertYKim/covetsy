var ListingActions = require('../actions/listing_actions');

var ListingsApiUtil = {
  fetchListing: function (listing, callback) {
    $.ajax({
      type: "GET",
      url: "api/listings/" + listing,
      success: function (listing) {
        ListingActions.receiveListing(listing);
        if (callback) {
          callback();
        }
      },
      error: function (errors) {
        ListingActions.receiveErrors(errors.responseJSON);
      }
    });
  }
};

module.exports = ListingsApiUtil;
