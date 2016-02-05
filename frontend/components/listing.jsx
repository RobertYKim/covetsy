var React = require('react');

var Listing = React.createClass({
  render: function () {
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
