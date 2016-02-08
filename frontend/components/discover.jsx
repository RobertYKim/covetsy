var React = require('react'),
    ProfileModalActions = require('../actions/profile_modal_actions'),
    ListingStore = require('../stores/listing_store'),
    ListingsApiUtil = require('../util/listings_api_util');

var Discover = React.createClass({
  _listingsChanged: function () {
    var listings = ListingStore.listings();
    this.setState({listings: listings});
  },

  handleClick: function (event) {
    event.stopPropagation();
    event.preventDefault();
    ProfileModalActions.hideProfileModal();
  },

  componentDidMount: function () {
    ListingsApiUtil.fetchListings();
    this.listingsListener = ListingStore.addListener(this._listingsChanged);
  },

  getInitialState: function () {
    return {listings: {}};
  },

  render: function () {
    return (
      <div className="discover" onClick={this.handleClick}>
        <div className="discover-body">
          <h2>Discover items you can't find anywhere else</h2>
        </div>
      </div>
    );
  }
});

module.exports = Discover;
