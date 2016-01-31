var React = require('react'),
    ProfileModal = require('./profile_modal'),
    AuthFormActions = require('../actions/auth_form_actions'),
    ProfileModalActions = require('../actions/profile_modal_actions'),
    ProfileModalStore = require('../stores/profile_modal_store'),
    SessionsApiUtil = require('../util/sessions_api_util');

var _getProfileModalState = function () {
  return ProfileModalStore.state();
};

var Header = React.createClass({
  handleClick: function (event) {
    event.preventDefault();
    var target = event.currentTarget.className;
    if (target === "register" || target === "signin") {
      AuthFormActions.showAuthForm(target);
    } else if (target === "you") {
      ProfileModalActions.showProfileModal();
    }
  },

  signout: function () {
    SessionsApiUtil.signout();
  },

  _profileModalChanged: function () {
    var profileModalState = _getProfileModalState();
    var visibility = profileModalState.visibility;
    this.setState({
      profileModalVisible: visibility
    });
  },

  getInitialState: function () {
    return ({profileModalVisible: false});
  },

  componentDidMount: function () {
    this.profileModalLisener =
      ProfileModalStore.addListener(this._profileModalChanged);
  },

  render: function () {
    var profileModal;
    if (this.state.profileModalVisible) {
      profileModal = <ProfileModal />;
    }

    var links;
    if (this.props.signedIn) {
      links =
      <div className="global-nav-links group">
        <div className="you" onClick={this.handleClick}>
          <span className="fa fa-user fa-2x"></span>
          <p>You ▾</p>
          {profileModal}
        </div>
      </div>;
    } else {
      links =
      <div className="global-nav-links">
        <a
          className="register"
          href="#"
          onClick={this.handleClick}>Register</a>
        <a
          className="signin"
          href="#"
          onClick={this.handleClick}>Sign in</a>
      </div>;
    }
    return (
      <div className="header">
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
