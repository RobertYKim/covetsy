var React = require('react'),
    ListingActions = require('../actions/listing_actions'),
    ListingStore = require('../stores/listing_store'),
    ListingsApiUtil = require('../util/listings_api_util');


var Listing = React.createClass({
  _listingChanged: function () {
    var listing = ListingStore.listing();
    this.setState({listing: listing});
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
      </div>;

    var listingRight;
    listingRight =
      <div className="listing-right">
        {listingOverview}
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
