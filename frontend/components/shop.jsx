var React = require('react'),
    History = require('react-router').History,
    ShopActions = require('../actions/shop_actions'),
    ShopStore = require('../stores/shop_store'),
    ShopsApiUtil = require('../util/shops_api_util');

var Shop = React.createClass({
  mixins: [History],

  _shopChanged: function () {
    var shop = ShopStore.shop();
    this.setState({shop: shop});
  },

  handleClick: function (event) {
    event.preventDefault();
    if (event.currentTarget.className === "listing-image") {
      var listingPath = "listing/" + event.currentTarget.id;
      this.history.pushState(null, listingPath, {});
    }
  },

  getInitialState: function () {
    return {shop: {}};
  },

  createDate: function (timestamp) {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'];
    var month,
        date,
        year,
        createdAt;
    createdAt = new Date(timestamp);
    date = createdAt.getDate();
    month = months[createdAt.getMonth()];
    year = createdAt.getFullYear();
    return month + " " + date + ", " + year;
  },

  componentDidMount: function () {
    this.shopStoreListener = ShopStore.addListener(this._shopChanged);
    var shop = this.props.params.shop_name;
    ShopsApiUtil.fetchShop(shop);
  },

  componentWillUnmount: function () {
    this.shopStoreListener.remove();
  },

  componentWillReceiveProps: function (nextProps) {
    var shop = nextProps.params.shop_name;
    ShopsApiUtil.fetchShop(shop);
  },

  render: function () {
    if (!ShopStore.shopHasBeenFetched()) {
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    }

    var firstName,
        lastName,
        username,
        shop_name,
        email,
        identifier,
        location,
        path,
        profilePath,
        openDate;
    openDate = this.createDate(this.state.shop.created_at);
    firstName = this.state.shop.first_name;
    lastName = this.state.shop.last_name;
    username = this.state.shop.username;
    shop_name = this.props.params.shop_name;
    email = "mailto:" + this.state.shop.email;
    if (firstName && lastName) {
      identifier = firstName + " " + lastName;
    } else if (firstName) {
      identifier = firstName;
    } else if (lastName) {
      identifier = lastName;
    } else {
      identifier = username;
    }
    location = " › " + shop_name;
    path = "#/shops/" + shop_name;
    profilePath = "#/people/" + username;

    var shopBreadcrumbs;
    shopBreadcrumbs =
      <div className="shop-breadcrumbs">
        <a
          className="shop-breadcrumbs-home"
          href="#">
          Home
        </a>
        <h5>{location}</h5>
      </div>;

    var profileImage;
    profileImage =
      <div className="profile-modal-container">
        <img
          className="profile-modal-container-image"
          src={this.state.shop.image_url}></img>
      </div>;

    var shopOwner;
    shopOwner =
      <div className="shop-owner">
        <h5>Shop Owner</h5>
        {profileImage}
        <a href={profilePath}>{identifier}</a>
        <h5>Have a question?</h5>
        <a href={email}>Contact the shop owner.</a>
      </div>;

    var shopInfo;
    shopInfo =
      <div className="shop-info">
        <h5>Shop Info</h5>
        <a href={path}><span className="fa fa-university"></span>{shop_name}</a>
        <h5>Opened on {openDate}</h5>
      </div>;

    var shopBanner;

    var shopListings = [];
    var listings = this.state.shop.listings;
    if (listings) {
      for (var i = 0; i < listings.length; i++) {
        var listingId = listings[i].id;
        var listingPath = "/#/listing/" + listingId;
        var image = "";
        if (listings[i].listing_images[0]) {
          image =
          <img
            id={listingId}
            className="listing-image"
            onClick={this.handleClick}
            src={listings[i].listing_images[0].image_url}></img>;
        }
        shopListings.push(
          <div key={i} className="shop-listing">
            <div className="shop-listing-image">
              <div className="shop-listing-image-wrapper">
                {image}
              </div>
            </div>
            <a href={listingPath}>{listings[i].title}</a>
            <h5>${listings[i].price}</h5>
          </div>
        );
      }
    }

    var shopStock;
    shopStock =
      <div className="shop-stock">
        {shopListings}
      </div>;

    return (
      <div className="shop-body group">
        {shopBreadcrumbs}
        <div className="shop-sidebar">
          {shopOwner}
          {shopInfo}
        </div>
        <div className="shop-content">
          {shopBanner}
          {shopStock}
        </div>
      </div>
    );
  }
});

module.exports = Shop;
