var React = require('react'),
    AuthFormActions = require('../actions/auth_form_actions'),
    SessionsApiUtil = require('../util/sessions_api_util');

var Header = React.createClass({
  handleClick: function (event) {
    event.preventDefault();
    var type = event.target.className;
    AuthFormActions.showAuthForm(type);
  },

  signout: function () {
    SessionsApiUtil.signout();
  },

  render: function () {
    var links;
    if (this.props.signedIn) {
      links =
      <div className="global-nav-links">
        <a
          className="you"
          href="#"
          onClick={this.signout}>You</a>
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
            <a className="logo" href="#">Covetsy</a>
          </div>
          {links}
        </div>
      </div>
    );
  }
});

module.exports = Header;
