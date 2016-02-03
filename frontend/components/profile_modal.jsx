var React = require('react'),
    History = require('react-router').History,
    ProfileActions = require('../actions/profile_actions'),
    ProfileModalActions = require('../actions/profile_modal_actions'),
    CurrentUserStore = require('../stores/current_user_store'),
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
      SessionsApiUtil.signout();
      this.history.pushState(null, '/', {});
    }
  },

  render: function () {
    var profileImage;
    profileImage = <span className="fa fa-user fa-4x"></span>;

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
