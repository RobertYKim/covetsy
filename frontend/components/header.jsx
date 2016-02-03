var React = require('react'),
    AuthForm = require('./auth_form'),
    ProfileModal = require('./profile_modal'),
    AuthFormActions = require('../actions/auth_form_actions'),
    ProfileModalActions = require('../actions/profile_modal_actions'),
    AuthFormStore = require('../stores/auth_form_store'),
    ProfileModalStore = require('../stores/profile_modal_store'),
    SessionsApiUtil = require('../util/sessions_api_util');

var _getProfileModalState = function () {
  return ProfileModalStore.state();
};

var Header = React.createClass({
  handleClick: function (event) {
    event.stopPropagation();
    event.preventDefault();
    var target = event.currentTarget.className;
    if (target === "register" || target === "signin") {
      AuthFormActions.showAuthForm(target);
    } else if (target === "you") {
      ProfileModalActions.showProfileModal();
    } else if (target === "guest") {
      AuthFormActions.hideAuthForm();
      SessionsApiUtil.signin({
        email_or_username: "guest",
        signin_password: "password"
      });
    } else if (event.target.className === "profile-modal") {
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
    return ({
      authFormVisible: false,
      profileModalVisible: false
    });
  },

  _profileModalChanged: function () {
    var profileModalState = _getProfileModalState();
    var visibility = profileModalState.visibility;
    this.setState({
      profileModalVisible: visibility
    });
  },

  componentDidMount: function () {
    this.authFormListener = AuthFormStore.addListener(this._authFormChanged);
    this.profileModalLisener =
      ProfileModalStore.addListener(this._profileModalChanged);
  },

  componentWillUnmount: function () {
    this.authFormListener.remove();
    this.profileModalLisener.remove();
  },

  render: function () {
    var profileModal;
    if (this.state.profileModalVisible) {
      profileModal = <ProfileModal />;
    }

    var authForm;
    if (this.state.authFormVisible) {
      authForm = <AuthForm
                    modalType={this.state.authFormType}
                    errors={this.state.authFormErrors}/>;
    }

    var links;
    if (this.props.signedIn) {
      links =
      <div className="global-nav-links group">
        <div className="you" onClick={this.handleClick}>
          <span className="fa fa-user fa-2x"></span>
          <p>You ▾</p>
        </div>
        {profileModal}
      </div>;
    } else {
      links =
      <div className="global-nav-links group">
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
