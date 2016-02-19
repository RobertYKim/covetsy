var React = require('react'),
    History = require('react-router').History,
    CookieActions = require('../actions/cookie_actions'),
    ListingActions = require('../actions/listing_actions'),
    ListingStore = require('../stores/listing_store'),
    CurrentUserStore = require('../stores/current_user_store'),
    ListingsApiUtil = require('../util/listings_api_util');


var Listing = React.createClass({
  mixins: [History],

  _listingChanged: function () {
    var listing = ListingStore.listing();
    this.setState({listing: listing});
  },

  handleClick: function (event) {
    event.preventDefault();
    var listingFormPath = "/shop/" + ListingStore.listing().shop_name + "/listing";
    this.history.pushState({listing: this.state.listing}, listingFormPath, {});
  },

  addToCart: function () {
    var existingListings = window.localStorage.getItem("cartListings");
    var newListing = {
      listingId: this.props.params.id,
      quantity: 1,
      max: this.state.listing.quantity
    };
    CookieActions.addToCart(existingListings, newListing);
  },

  getInitialState: function () {
    return {listing: {}};
  },

  componentDidMount: function () {
    this.listingStoreListener = ListingStore.addListener(this._listingChanged);
    var listing = this.props.params.id;
    ListingsApiUtil.fetchListing(listing);
  },

  componentWillUnmount: function () {
    this.listingStoreListener.remove();
    ListingActions.resetListing();
  },

  componentWillReceiveProps: function () {
    var listing = this.props.params.id;
    ListingsApiUtil.fetchListing(listing);
  },

  render: function () {
    if (!ListingStore.listingHasBeenFetched()) {
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    }

    var listing = this.state.listing;
    var listingHeader;

    var listingGallery;
    if (this.state.listing.listing_images) {
      listingGallery =
      <div className="listing-gallery">
        <img src={this.state.listing.listing_images[0].image_url}></img>
      </div>;
    }

    var listingDetail;
    listingDetail =
      <div className="listing-detail">
        <h5>Item Details</h5>
        <p>{listing.description}</p>
      </div>;

    var listingLeft;
    listingLeft =
      <div className="listing-left">
        {listingGallery}
        {listingDetail}
      </div>;

    var listingOverview;
    listingOverview =
      <div className="listing-overview">
        <h5>{listing.title}</h5>
        <h5>${listing.price}</h5>
        <p>Quantity: {listing.quantity}</p>
        <div className="add-to-cart" onClick={this.addToCart}>
          Add to Cart
        </div>
      </div>;

    var editListing;
    if (CurrentUserStore.currentUser().id === listing.user_id) {
      var listingFormPath = "/#/shop/" + listing.shop_name + "/listings";
      editListing =
        <div className="listing-edit" onClick={this.handleClick}>
          Edit Listing
        </div>;
    }

    var listingRight;
    listingRight =
      <div className="listing-right">
        {listingOverview}
        {editListing}
      </div>;

    var listingBody;
    listingBody =
      <div className="listing-body group">
        {listingLeft}
        {listingRight}
      </div>;


    return (
      <div className="listing">
        {listingHeader}
        {listingBody}
      </div>
    );
  }
});

module.exports = Listing;
