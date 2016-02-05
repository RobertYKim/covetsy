var React = require('react'),
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
  },

  render: function () {
    if (!ListingStore.listingHasBeenFetched()) {
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    }

    var listingHeader;

    var listingGallery;
    listingGallery =
      <div className="listing-gallery">

      </div>;

    var listingDetail;
    listingDetail =
      <div className="listing-detail">

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
