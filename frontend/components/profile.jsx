var React = require('react'),
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

  componentDidMount: function () {
    this.profileListener = ProfileStore.addListener(this._profileChanged);
    var user = this.props.params.username;
    UsersApiUtil.fetchUser(user);
  },

  render: function () {
    if (!ProfileStore.userHasBeenFetched()) {
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    }

    var identifier,
        location,
        title,
        firstName,
        lastName,
        username,
        path,
        month,
        date,
        year,
        createdAt,
        joinDate;
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
    createdAt = new Date(this.state.user.created_at);
    date = createdAt.getDate();
    month = months[createdAt.getMonth()];
    year = createdAt.getFullYear();
    joinDate = month + " " + date + ", " + year;
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
        <div className="profile-breadcrumbs">
          <a href="#">Home</a>
          <h5>{location}</h5>
        </div>
        <div className="profile-nav">
          <div className="profile-nav-image">
            <span className="fa fa-user fa-5x"></span>
          </div>
          <div className="profile-nav-camera">
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
