var React = require('react'),
    History = require('react-router').History,
    ShopStore = require('../stores/shop_store'),
    ShopsApiUtil = require('../util/shops_api_util');

var Hero = React.createClass({
  mixins: [History],

  _shopChanged: function () {
    var shop = ShopStore.shop();
    this.setState({shop: shop});
  },

  handleClick: function (event) {
    event.preventDefault();
    var shopPath = "shop/" + this.state.shop.shop_name;
    if (event.currentTarget.className === "hero-seller") {
      this.history.pushState(null, shopPath, {});
    } else if (event.currentTarget.className === "listing-image") {
      var listingPath = "listing/" + event.currentTarget.id;
      this.history.pushState(null, listingPath, {});
    } else if (event.currentTarget.className === "hero-gallery-count-wrapper") {
      this.history.pushState(null, shopPath, {});
    }
  },

  componentDidMount: function () {
    this.shopStoreListener = ShopStore.addListener(this._shopChanged);
    shop = ShopsApiUtil.fetchShop(this.props.shopName);
  },

  componentWillUnmount: function () {
    this.shopStoreListener.remove();
  },

  componentWillReceiveProps: function () {
    shop = ShopsApiUtil.fetchShop(this.props.shopName);
  },

  getInitialState: function () {
    return {shop: {}};
  },

  render: function () {
    if (!ShopStore.shopHasBeenFetched()) {
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    } else if (!this.state.shop) {
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    }

    var firstName = this.state.shop.first_name;
    var shopName = this.state.shop.shop_name;

    var galleryListings = [];
    var listings;
    if (this.state.shop.listings) {
      listings = this.state.shop.listings;
      for (var i = 0; i < 4; i++) {
        var listingId = listings[i].id;
        var image = "";
        if (listings[i].listing_images[0]) {
          image =
            <img
              id={listingId}
              className="listing-image"
              onClick={this.handleClick}
              src={listings[i].listing_images[0].image_url}></img>;
        }
        galleryListings.push(
          <div key={i} className="hero-gallery-item">
            <div className="hero-gallery-item-wrapper">
              {image}
            </div>
          </div>
        );
      }
      var lastKey = galleryListings.length;
      galleryListings.push(
        <div key={lastKey} className="hero-gallery-item">
          <div
            className="hero-gallery-count-wrapper"
            onClick={this.handleClick}>
            <h4>{listings.length}</h4>
            <h5>items</h5>
          </div>
        </div>
      );
    }

    return (
      <div className="hero">
        <div className="hero-body">
          <h1>Shop directly from people around the world.</h1>
          <div className="hero-overlay">
          <div className="hero-bottom group">
            <div className="hero-seller" onClick={this.handleClick}>
              <div className="hero-seller-picture"></div>
              <div className="hero-seller-info">
                <p className="name-store">
                  {firstName} of <a>{shopName}</a>
                </p>
                <p className="location">New York, New York</p>
              </div>
            </div>
            <div className="hero-gallery">
              {galleryListings}
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
});

module.exports = Hero;
