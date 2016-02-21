var React = require('react'),
    History = require('react-router').History,
    CookieActions = require('../actions/cookie_actions'),
    ProfileActions = require('../actions/profile_actions'),
    ProfileModalActions = require('../actions/profile_modal_actions'),
    CurrentUserStore = require('../stores/current_user_store'),
    UsersApiUtil = require('../util/users_api_util'),
    SessionsApiUtil = require('../util/sessions_api_util');

var ProfileModal = React.createClass({
  mixins: [History],

  handleClick: function (event) {
    event.preventDefault();
    if (event.currentTarget.className === "profile-modal-user group") {
      ProfileModalActions.hideProfileModal();
      var currentUser = CurrentUserStore.currentUser().username;
      this.history.pushState(null, '/people/' + currentUser, {});
    } else if (event.currentTarget.className === "profile-modal-signout") {
      var cartListings;
      if (window.localStorage.cartListings) {
        cartListings = window.localStorage.cartListings;
      } else {
        cartListings = "";
      }
      UsersApiUtil.editUser({cart: cartListings}, SessionsApiUtil.signout);
      if (cartListings) {
        CookieActions.checkout();
      }
      this.history.pushState(null, '/', {});
    }
  },

  render: function () {
    var profileImage;
    profileImage =
      <div className="profile-modal-container">
        <img
          className="profile-modal-container-image"
          src={this.props.imageUrl}></img>
      </div>;

    var profileName,
        currentUser,
        identifier;
    currentUser = CurrentUserStore.currentUser();
    if (currentUser.first_name && currentUser.last_name) {
      identifier = currentUser.first_name + " " + currentUser.last_name;
    } else if (currentUser.first_name) {
      identifier = currentUser.first_name;
    } else if (currentUser.last_name) {
      identifier = currentUser.last_name;
    } else {
      identifier = currentUser.username;
    }
    profileName = <h4>{identifier}</h4>;

    var profileViewButton;
    profileViewButton =
      <a href="#" className="profile-modal-button">
        View profile
      </a>;

    var signout;
    signout =
      <a href="#" className="profile-modal-signout-link">Sign out</a>;

    return (
      <div className="profile-modal">
        <div className="profile-modal-user group" onClick={this.handleClick}>
          <div className="profile-modal-user-image">
            {profileImage}
          </div>
          <div className="profile-modal-user-info">
            {profileName}
            {profileViewButton}
          </div>
        </div>
        <div className="profile-modal-signout" onClick={this.handleClick}>
          {signout}
        </div>
      </div>
    );
  }
});

module.exports = ProfileModal;
