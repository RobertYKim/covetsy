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

  toggleVisibility: function () {
    this.setState({authFormVisible: false});
  },

  getInitialState: function () {
    return {authFormVisible: false};
  },

  componentDidMount: function () {
    this.authFormListener = AuthFormStore.addListener(this._authFormChanged);
    this.currentUserListener =
      CurrentUserStore.addListener(this.forceUpdate.bind(this));
    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {
    var authForm;
    if (this.state.authFormVisible) {
      authForm = <AuthForm
                    toggleVisibility={this.toggleVisibility}
                    modalType={this.state.authFormType}/>;
    }

    return (
      <div>
        <Header />
        {this.props.children}
        {authForm}
      </div>
    );
  }
});

module.exports = App;
