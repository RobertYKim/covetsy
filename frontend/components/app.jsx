var React = require('react'),
    Header = require('./header'),
    AuthForm = require('./auth_form'),
    Greeting = require('./greeting'),
    Hero = require('./hero'),
    Discover = require('./discover'),
    AuthFormStore = require('../stores/auth_form_store'),
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
    var errors = authFormState.errors;
    this.setState({
      authFormVisible: visibility,
      authFormType: type,
      authFormErrors: errors
    });
  },

  _currentUserChanged: function () {
    if (CurrentUserStore.isSignedIn()) {
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
      return <span className="fa fa-spinner fa-5x fa-pulse"></span>;
    }

    var signedIn,
        greeting,
        hero,
        discover;
    if (CurrentUserStore.isSignedIn()) {
      signedIn = true;
      greeting = <Greeting currentUser={CurrentUserStore.currentUser()}/>;
      discover = <Discover />;
    } else {
      signedIn = false;
      hero = <Hero />;
      discover = <Discover />;
    }

    var authForm;
    if (this.state.authFormVisible) {
      authForm = <AuthForm
                    toggleVisibility={this.toggleVisibility}
                    modalType={this.state.authFormType}
                    errors={this.state.authFormErrors}/>;
    }


    return (
      <div>
        <Header signedIn={signedIn}/>
        {this.props.children}
        {authForm}
        {greeting}
        {hero}
        {discover}
      </div>
    );
  }
});

module.exports = App;
