var React = require('react'),
    Header = require('./header'),
    AuthFormStore = require('../stores/auth_form_store'),
    CurrentUserStore = require('../stores/current_user_store'),
    ProfileStore = require('../stores/profile_store'),
    SessionsApiUtil = require('../util/sessions_api_util');

var App = React.createClass({

  _profileChanged: function () {
    var profileState = AuthFormStore.state();
  },

  _currentUserChanged: function () {
    if (CurrentUserStore.isSignedIn()) {
      var cart = CurrentUserStore.currentUser().cart;
      if (cart !== null && cart !== "{}") {
        window.localStorage.setItem("cartListings", cart);
      }
      this.setState({signedIn: true});
    } else {
      if (window.localStorage.cartListings) {
        window.localStorage.removeItem("cartListings");
      }
      this.setState({signedIn: false});
    }
    this.forceUpdate();
  },

  componentDidMount: function () {
    this.currentUserListener =
      CurrentUserStore.addListener(this._currentUserChanged);
    SessionsApiUtil.fetchCurrentUser();
    this.profileListener = ProfileStore.addListener(this._profileChanged);
  },

  componentWillUnmount: function () {
    this.currentUser.remove();
    this.profileListener.remove();
  },

  render: function () {
    if (!CurrentUserStore.currentUserHasBeenFetched()) {
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    }

    var signedIn = CurrentUserStore.isSignedIn();
    var currentUser = CurrentUserStore.currentUser();
    var childrenWithProps =
      React.Children.map(this.props.children, function (child) {
        return React.cloneElement(
          child, { signedIn: signedIn, currentUser: currentUser }
        );
      }
    );

    return (
      <div>
        <Header signedIn={signedIn}/>
        {childrenWithProps}
      </div>
    );
  }
});

module.exports = App;
