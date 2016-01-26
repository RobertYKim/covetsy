var React = require('react');

var App = React.createClass({
  render: function () {
    return (
      <div className="header">
        <div className="global-nav group">
          <div className="global-nav-logo-search">
            <a className="logo" href="#">Covetsy</a>
          </div>

          <div className="global-nav-links">
            <a className="register" href="#">Register</a>
            <a className="signin" href="#">Sign in</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
