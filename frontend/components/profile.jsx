var React = require('react'),
    ProfilePictureModal = require('./profile_picture_modal'),
    ProfilePictureModalActions =
      require('../actions/profile_picture_modal_actions'),
    ProfilePictureModalStore = require('../stores/profile_picture_modal_store'),
    ProfileStore = require('../stores/profile_store'),
    UsersApiUtil = require('../util/users_api_util');

var _getProfile = function () {
  return ProfileStore.profile();
};

var Profile = React.createClass({
  _profileChanged: function () {
    var profile = _getProfile();
    var user = profile.user;
    var errors = profile.errors;
    this.setState({
      user: user,
      errors: errors
    });
  },

  _profilePictureModalChanged: function () {
    var ProfilePictureModalState = ProfilePictureModalStore.state();
    var visibility = ProfilePictureModalState.visibility;
    this.setState({profilePictureModalVisible: visibility});
  },

  handleClick: function (event) {
    event.preventDefault();
    ProfilePictureModalActions.showProfilePictureModal();
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
    this.profileListener = ProfileStore.addListener(this._profileChanged);
    var user = this.props.params.username;
    UsersApiUtil.fetchUser(user);
    this.profilePictureModalListener =
      ProfilePictureModalStore.addListener(this._profilePictureModalChanged);
  },

  componentWillUnmount: function () {
    this.profileListener.remove();
  },

  getInitialState: function () {
    return {user: {}};
  },

  render: function () {
    if (!ProfileStore.userHasBeenFetched()) {
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    } else if (!this.state.user) {
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    }

    var profilePictureModal;
    if (this.state.profilePictureModalVisible) {
      profilePictureModal = <ProfilePictureModal />;
    }

    var identifier,
        location,
        title,
        firstName,
        lastName,
        username,
        path,
        joinDate;
    joinDate = this.createDate(this.state.user.created_at);
    firstName = this.state.user.first_name;
    lastName = this.state.user.last_name;
    username = this.props.params.username;
    if (firstName && lastName) {
      identifier = firstName + " " + lastName;
    } else if (firstName) {
      identifier = firstName;
    } else if (lastName) {
      identifier = lastName;
    } else {
      identifier = username;
    }
    location = " › " + identifier + "'s profile";
    path = "#/people/" + username;
    title = identifier + "'s Profile";

    return (
      <div className="profile group">
        {profilePictureModal}
        <div className="profile-breadcrumbs">
          <a href="#">Home</a>
          <h5>{location}</h5>
        </div>
        <div className="profile-nav">
          <div className="profile-nav-image">
            <span className="fa fa-user fa-5x"></span>
          </div>
          <div className="profile-nav-camera" onClick={this.handleClick}>
            <span className="fa fa-camera"></span>
          </div>
          <div className="profile-identifier">
            <a href={path}>{identifier}</a>
          </div>
          <div className="profile-tabs-profile">
            <a>Profile</a>
          </div>
        </div>
        <div className="profile-title">
          <h3>{title}</h3>
        </div>
        <div className="profile-about">
          <h4>About</h4>
          <p>Joined {joinDate}</p>
        </div>
      </div>
    );
  }
});

module.exports = Profile;
