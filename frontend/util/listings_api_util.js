var ListingActions = require('../actions/listing_actions');

var ListingsApiUtil = {
  createListing: function (formData, callback) {
    $.ajax({
      type: "POST",
      url: "api/shops/:shop_id/listings",
      processData: false,
      contentType: false,
      data: formData,
      success: function (listing) {
        ListingActions.receiveListing(listing);
        if (callback) {
          callback(listing);
        }
      }
    });
  },

  updateListing: function (formData, callback) {
    $.ajax({
      type: "PATCH",
      url: "api/listings/:id",
      processData: false,
      contentType: false,
      data: formData,
      success: function (listing) {
        ListingActions.receiveListing(listing);
        if (callback) {
          callback(listing);
        }
      }
    });
  },

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
  },

  fetchListings: function (callback) {
    $.ajax({
      type: "GET",
      url: "api/listings",
      success: function (listings) {
        ListingActions.receiveListings(listings);
        if (callback) {
          callback();
        }
      }
    });
  }
};

module.exports = ListingsApiUtil;
