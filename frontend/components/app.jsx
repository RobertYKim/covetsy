var React = require('react'),
    Header = require('./header'),
    AuthForm = require('./auth_form'),
    AuthFormStore = require('../stores/auth_form'),
    CurrentUserStore = require('../stores/current_user_store'),
    SessionsApiUtil = require('../util/sessions_api_util');

var _getAuthFormState = function () {
  return AuthFormStore.state();
};

var App = React.createClass({
  _authFormChanged: function () {
    var authFormState = _getAuthFormState();
    var visibility = authFormState.visibility;
    var type = authFormState.type;
    this.setState({
      authFormVisible: visibility,
      authFormType: type
    });
  },

  _currentUserChanged: function () {
    if (CurrentUserStore.isLoggedIn()) {
      this.setState({
        authFormVisible: false
      });
    }
    this.forceUpdate();
  },

  toggleVisibility: function () {
    this.setState({authFormVisible: false});
  },

  getInitialState: function () {
    return {authFormVisible: false};
  },

  componentDidMount: function () {
    this.authFormListener = AuthFormStore.addListener(this._authFormChanged);
    this.currentUserListener =
      CurrentUserStore.addListener(this._currentUserChanged);
    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {
    if (!CurrentUserStore.currentUserHasBeenFetched()) {
      return <p>PLEASE WAIT</p>;
    }

    var authForm;
    if (this.state.authFormVisible) {
      authForm = <AuthForm
                    toggleVisibility={this.toggleVisibility}
                    modalType={this.state.authFormType}/>;
    }

    var welcomeMessage;
    if (CurrentUserStore.isLoggedIn) {
      var currentUser = CurrentUserStore.currentUser().username;
      welcomeMessage = <p>Welcome! {currentUser}</p>;
    }

    return (
      <div>
        <Header />
        {this.props.children}
        {authForm}
        {welcomeMessage}
      </div>
    );
  }
});

module.exports = App;
