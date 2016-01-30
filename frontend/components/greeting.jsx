var React = require('react');

var Greeting = React.createClass({
  render: function () {
    var identifier;
    if (this.props.currentUser.first_name) {
      identifier = this.props.currentUser.first_name;
    } else if (this.props.currentUser.username) {
      identifier = this.props.currentUser.username;
    }

    return (
      <div className="greeting">
        <h1>Hi, {identifier}!</h1>
      </div>
    );
  }
});

module.exports = Greeting;
