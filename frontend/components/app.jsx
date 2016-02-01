var React = require('react'),
    Header = require('./header'),

    Greeting = require('./greeting'),
    Hero = require('./hero'),
    Discover = require('./discover'),
    AuthFormStore = require('../stores/auth_form_store'),
    CurrentUserStore = require('../stores/current_user_store'),
    ProfileStore = require('../stores/profile_store'),
    SessionsApiUtil = require('../util/sessions_api_util');

var App = React.createClass({


  _profileChanged: function () {
    var profileState = AuthFormStore.state();
  },

  _currentUserChanged: function () {
    if (CurrentUserStore.isSignedIn()) {
      this.setState({signedIn: true});
    } else {
      this.setState({signedIn: false});
    }
    this.forceUpdate();
  },

  componentDidMount: function () {

    this.currentUserListener =
      CurrentUserStore.addListener(this._currentUserChanged);
    SessionsApiUtil.fetchCurrentUser();
    this.profileListener = ProfileStore.addListener(this._profileChanged);
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

    return (
      <div>
        <Header signedIn={signedIn}/>
        {this.props.children}

        {greeting}
        {hero}
        {discover}
      </div>
    );
  }
});

module.exports = App;
