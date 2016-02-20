var React = require('react'),
    CookieActions = require('../actions/cookie_actions'),
    CookieStore = require('../stores/cookie_store'),
    ListingStore = require('../stores/listing_store'),
    ListingsApiUtil = require('../util/listings_api_util');

var Cart = React.createClass({
  _cookieChanged: function () {
    var listings = this.fetchCartListings();
    ListingsApiUtil.fetchListings(listings);
  },

  _listingChanged: function () {
    var listings = ListingStore.listings();
    this.setState({listings: listings});
  },

  handleRemove: function (event) {
    var id = event.currentTarget.id;
    CookieActions.removeFromCart(id);
  },

  fetchCartListings: function () {
    var listings = [];
    if (window.localStorage.cartListings) {
      var keys = Object.keys(JSON.parse(window.localStorage.cartListings));
      keys.forEach( function (key) {
        listings.push(parseInt(key));
      });
      return listings;
    }
  },

  componentDidMount: function () {
    var listings = this.fetchCartListings();
    ListingsApiUtil.fetchListings(listings);
    this.listingStoreListener = ListingStore.addListener(this._listingChanged);
    this.cookieStoreListener = CookieStore.addListener(this._cookieChanged);
  },

  componentWillUnmount: function () {
    this.listingStoreListener.remove();
    this.cookieStoreListener.remove();
  },

  getInitialState: function () {
    var cartSize;
    if (window.localStorage.cartListings) {
      cartSize =
        Object.keys(JSON.parse(window.localStorage.cartListings)).length;
    }
    return ({cartSize: cartSize});
  },

  render: function () {
    var header;
    if (this.state.listings && window.localStorage.cartListings) {
      var cartSize = Object.keys(this.state.listings.listings).length;
      if (cartSize === 1) {
        header = <h3 className="cart-size">1 Item in Your Cart</h3>;
      } else {
        header = <h3 className="cart-size">{cartSize} Items in Your Cart</h3>;
      }
    } else {
      header = <div className="cart-empty">Your cart is empty.</div>;
    }

    var listings = [];
    if (this.state.listings && window.localStorage.cartListings) {
      var cartQuantities = JSON.parse(window.localStorage.cartListings);
      this.state.listings.listings.forEach ( function (listing) {
        var listingPath = "/#/listing/" + listing.id;
        var shopPath = "/#/shop/" + listing.shop_name;
        var entry =
          <div key={listing.id} className="cart-listing">
            <div className="cart-image-wrapper">
              <a href={listingPath}>
                <img src={listing.listing_images[0].image_url}></img>
              </a>
            </div>
            <div className="cart-listing-info">
              <a href={listingPath}>{listing.title}</a>
              <a href={shopPath}>{listing.shop_name}</a>
              <p>Quantity: {cartQuantities[listing.id]}</p>
              <p>$ {listing.price}</p>
            </div>
            <div
              id={listing.id}
              className="cart-listing-remove"
              onClick={this.handleRemove}>
              Remove
            </div>
          </div>;
        listings.push(entry);
      }.bind(this));
    }

    return (
      <div className="cart">
        <div className="cart-container">
          {header}
          {listings}
        </div>
      </div>
    );
  }
});

module.exports = Cart;
