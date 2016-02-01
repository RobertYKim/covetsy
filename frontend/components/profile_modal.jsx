var React = require('react'),
    ProfileModalActions = require('../actions/profile_modal_actions'),
    CurrentUserStore = require('../stores/current_user_store');

var ProfileModal = React.createClass({
  handleClick: function (event) {
    event.preventDefault();
    if (event.target.className === "profile-modal-overlay") {
      ProfileModalActions.hideProfileModal();
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

    return (
      <div className="profile-modal group" onClick={this.handleClick}>
        <div className="profile-modal-image">
          {profileImage}
        </div>
        <div className="profile-modal-info">
          {profileName}
          {profileViewButton}
        </div>
      </div>
    );
  }
});

module.exports = ProfileModal;
