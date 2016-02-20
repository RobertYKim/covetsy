var React = require('react'),
    History = require('react-router').History,
    AuthForm = require('./auth_form'),
    ProfileModal = require('./profile_modal'),
    AuthFormActions = require('../actions/auth_form_actions'),
    ProfileModalActions = require('../actions/profile_modal_actions'),
    AuthFormStore = require('../stores/auth_form_store'),
    ProfileModalStore = require('../stores/profile_modal_store'),
    CurrentUserStore = require('../stores/current_user_store'),
    CookieStore = require('../stores/cookie_store'),
    SessionsApiUtil = require('../util/sessions_api_util');

var _getProfileModalState = function () {
  return ProfileModalStore.state();
};

var Header = React.createClass({
  mixins: [History],

  handleClick: function (event) {
    event.stopPropagation();
    event.preventDefault();
    var target = event.currentTarget.className;
    if (target === "register" || target === "signin") {
      AuthFormActions.showAuthForm(target);
    } else if (target === "shopping-cart") {
      this.history.pushState(null, 'cart', {});
    } else if (target === "sell") {
      this.history.pushState(null, 'sell', {});
    } else if (target === "shop") {
      var currentUserShop = CurrentUserStore.currentUser().shop_name;
      this.history.pushState(null, '/shop/' + currentUserShop, {});
    } else if (target === "you") {
      ProfileModalActions.showProfileModal();
    } else if (target === "guest") {
      AuthFormActions.hideAuthForm();
      SessionsApiUtil.signin({
        email_or_username: "guest",
        signin_password: "password"
      });
    } else if (event.target.className === "logo") {
      this.history.pushState(null, '/', {});
    } else if (event.target.className !== "profile-modal") {
      ProfileModalActions.hideProfileModal();
    }
  },

  _authFormChanged: function () {
    var authFormState = AuthFormStore.state();
    var visibility = authFormState.visibility;
    var type = authFormState.type;
    var errors = authFormState.errors;
    this.setState({
      authFormVisible: visibility,
      authFormType: type,
      authFormErrors: errors
    });
  },

  getInitialState: function () {
    var cartSize =
      Object.keys(JSON.parse(window.localStorage.cartListings)).length;
    return ({
      authFormVisible: false,
      profileModalVisible: false,
      cartSize: cartSize
    });
  },

  _profileModalChanged: function () {
    var profileModalState = _getProfileModalState();
    var visibility = profileModalState.visibility;
    this.setState({
      profileModalVisible: visibility
    });
  },

  _cookieChanged: function () {
    var cartSize =
      Object.keys(JSON.parse(window.localStorage.cartListings)).length;
    this.setState({cartSize: cartSize});
    this.history.pushState(null, 'cart', {});
  },

  componentDidMount: function () {
    this.authFormListener = AuthFormStore.addListener(this._authFormChanged);
    this.profileModalListener =
      ProfileModalStore.addListener(this._profileModalChanged);
    this.cookieStoreListener = CookieStore.addListener(this._cookieChanged);
  },

  componentWillUnmount: function () {
    this.authFormListener.remove();
    this.profileModalListener.remove();
    this.cookieStoreListener.remove();
  },

  render: function () {
    var currentUser = CurrentUserStore.currentUser();

    var profileModal;
    if (this.state.profileModalVisible) {
      profileModal = <ProfileModal imageUrl={currentUser.image_url}/>;
    }

    var authForm;
    if (this.state.authFormVisible) {
      authForm = <AuthForm
                    modalType={this.state.authFormType}
                    errors={this.state.authFormErrors}/>;
    }

    var sell;
    if (currentUser && !currentUser.shop_owner) {
      sell =
        <a
          className="sell"
          href="#"
          onClick={this.handleClick}>Sell on covEtsy</a>;
    }

    var you;
    you =
      <div className="you" onClick={this.handleClick}>
        <div className="you-container">
          <img
            className="you-container-image"
            src={currentUser.image_url}></img>
        </div>
        <p>You ▾</p>
      </div>;

    var shop;
    if (currentUser && currentUser.shop_owner) {
      shop =
      <div className="shop" onClick={this.handleClick}>
        <div className="shop-container">
          <span className="fa fa-university fa-lg"></span>
        </div>
        <p>Your Shop</p>
      </div>;
    }

    var shoppingCartBadge;
    if (this.state.cartSize > 0) {
      shoppingCartBadge =
        <div className="shopping-cart-badge">{this.state.cartSize}</div>;
    }

    var shoppingCart;
    shoppingCart =
      <div className="shopping-cart" onClick={this.handleClick}>
        <div className="shopping-cart-container">
          <span className="fa fa-shopping-cart fa-lg"></span>
          {shoppingCartBadge}
        </div>
        <p>Cart</p>
      </div>;


    var links;
    if (this.props.signedIn) {
      links =
      <div className="global-nav-links group">
        {shop}
        {sell}
        {you}
        {shoppingCart}
        {profileModal}
      </div>;
    } else {
      links =
      <div className="global-nav-links group">
        <a
          className="sell"
          href="#"
          onClick={this.handleClick}>Sell on covEtsy</a>
        <a
          className="register"
          href="#"
          onClick={this.handleClick}>Register</a>
        <a
          className="guest"
          href="#"
          onClick={this.handleClick}>Guest Sign in</a>
        <a
          className="signin"
          href="#"
          onClick={this.handleClick}>Sign in</a>
        {cart}
      </div>;
    }
    return (
      <div className="header" onClick={this.handleClick}>
        {authForm}
        <div className="global-nav group">
          <div className="global-nav-logo-search">
            <a className="logo" href="#">covEtsy</a>
          </div>
          {links}
        </div>
      </div>
    );
  }
});

module.exports = Header;
