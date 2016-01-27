var React = require('react'),
    AuthFormActions = require('../actions/auth_form_actions');

var Header = React.createClass({
  handleClick: function (event) {
    event.preventDefault();
    var type = event.target.className;
    AuthFormActions.showAuthForm(type);
  },

  render: function () {
    return (
      <div className="header">
        <div className="global-nav group">
          <div className="global-nav-logo-search">
            <a className="logo" href="#">Covetsy</a>
          </div>

          <div className="global-nav-links">
            <a
              className="register"
              href="#"
              onClick={this.handleClick}>Register</a>
            <a
              className="signin"
              href="#"
              onClick={this.handleClick}>Sign in</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
