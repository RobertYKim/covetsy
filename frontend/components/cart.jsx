var React = require('react'),
    CheckoutModal = require('../components/checkout_modal'),
    CookieActions = require('../actions/cookie_actions'),
    ProfileModalActions = require('../actions/profile_modal_actions'),
    CheckoutModalActions = require('../actions/checkout_modal_actions'),
    CookieStore = require('../stores/cookie_store'),
    ListingStore = require('../stores/listing_store'),
    CheckoutModalStore = require('../stores/checkout_modal_store'),
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

  _checkoutModalChanged: function () {
    var CheckoutModalState = CheckoutModalStore.state();
    var visibility = CheckoutModalState.visibility;
    this.setState({checkoutModalVisible: visibility});
  },

  handleClick: function (event) {
    if (event.target.className === "cart") {
      ProfileModalActions.hideProfileModal();
    } else if (event.target.className === "cart-listing-remove") {
      var id = event.target.id;
      CookieActions.removeFromCart(id);
    }
  },

  handleCheckout: function (event) {
    CookieActions.checkout();
    CheckoutModalActions.showCheckoutModal();
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

  listingsToLoad: function () {
    if (
      this.state.listings &&
      window.localStorage.cartListings &&
      (window.localStorage.cartListings !== "{}")
    ) {
      return true;
    } else {
      return false;
    }
  },

  componentDidMount: function () {
    var listings = this.fetchCartListings();
    ListingsApiUtil.fetchListings(listings);
    this.listingStoreListener = ListingStore.addListener(this._listingChanged);
    this.cookieStoreListener = CookieStore.addListener(this._cookieChanged);
    this.checkoutModalStoreListener =
      CheckoutModalStore.addListener(this._checkoutModalChanged);
  },

  componentWillUnmount: function () {
    this.listingStoreListener.remove();
    this.cookieStoreListener.remove();
    this.checkoutModalStoreListener.remove();
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
    if (this.listingsToLoad()) {
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
    if (this.listingsToLoad()) {
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
              className="cart-listing-remove">
              Remove
            </div>
          </div>;
        listings.push(entry);
      }.bind(this));
    }

    var checkout;
    if (this.listingsToLoad()) {
      checkout =
        <div className="checkout" onClick={this.handleCheckout}>Checkout</div>;
    }

    var checkoutModal;
    if (this.state.checkoutModalVisible) {
      checkoutModal = <CheckoutModal />;
    }

    return (
      <div className="cart" onClick={this.handleClick}>
        {checkoutModal}
        <div className="cart-container">
          {header}
          {listings}
          {checkout}
        </div>
      </div>
    );
  }
});

module.exports = Cart;
