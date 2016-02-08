var React = require('react'),
    History = require('react-router').History,
    ProfileModalActions = require('../actions/profile_modal_actions'),
    ListingStore = require('../stores/listing_store'),
    ListingsApiUtil = require('../util/listings_api_util');

var Discover = React.createClass({
  mixins: [History],

  _listingsChanged: function () {
    var listings = ListingStore.listings();
    this.setState({listings: listings});
  },

  shuffle: function (array) {
    var currentIndex = array.length;
    var temporaryValue,
        randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  handleClick: function (event) {
    event.stopPropagation();
    event.preventDefault();
    ProfileModalActions.hideProfileModal();
    var listingPath = "listing/" + event.currentTarget.id;
    if (event.currentTarget.className === "discover-listing-image") {
      this.history.pushState(null, listingPath, {});
    } else if (event.currentTarget.className === "discover-listing-link") {
      this.history.pushState(null, listingPath, {});
    } else if (event.currentTarget.className === "discover-listing-shop") {
      var shopName = "shop/" + event.currentTarget.innerHTML;
      this.history.pushState(null, shopName, {});
    }
  },

  componentDidMount: function () {
    ListingsApiUtil.fetchListings();
    this.listingsListener = ListingStore.addListener(this._listingsChanged);
  },

  componentWillUnmount: function () {
    this.listingsListener.remove();
  },

  getInitialState: function () {
    return {listings: {}};
  },

  render: function () {
    if (!ListingStore.listingsHaveBeenFetched()) {
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    }

    var listings = [];
    if (this.state.listings.listings) {
    var allListings = this.shuffle(this.state.listings.listings);
      for (var i = 0; i < 12; i++) {
        var listingTitle = allListings[i].title;
        var listingId = allListings[i].id;
        var listingPath = "/#/listing/" + listingId;
        var shopName = allListings[i].shop_name;
        var shopPath = "/#/shop/" + shopName;
        var image;
        if (allListings[i].listing_images[0]) {
          image =
            <img
              id={listingId}
              className="discover-listing-image"
              onClick={this.handleClick}
              src={allListings[i].listing_images[0].image_url}></img>;
        }
        var listingPrice = allListings[i].price;
        var listingShop = allListings[i].shop_name;
        listings.push(
          <div key={i} className="discover-listing">
            <div className="discover-listing-image-wrapper">
              {image}
            </div>
            <a
              id={listingId}
              href={listingPath}
              className="discover-listing-link"
              onClick={this.handleClick}>{listingTitle}</a>
            <div className="discover-listing-footer group">
              <a
                href={shopPath}
                className="discover-listing-shop"
                onClick={this.handleClick}>{shopName}</a>
              <h5>${allListings[i].price}</h5>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="discover" onClick={this.handleClick}>
        <div className="discover-body">
          <h2>Discover items you can't find anywhere else</h2>
          {listings}
        </div>
      </div>
    );
  }
});

module.exports = Discover;
