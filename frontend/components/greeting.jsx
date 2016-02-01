var React = require('react'),
    ProfileModalActions = require('../actions/profile_modal_actions');

var Greeting = React.createClass({
  handleClick: function (event) {
    debugger
    event.preventDefault();
    ProfileModalActions.hideProfileModal();
  },

  render: function () {
    var identifier;
    if (this.props.currentUser.first_name) {
      identifier = this.props.currentUser.first_name;
    } else if (this.props.currentUser.username) {
      identifier = this.props.currentUser.username;
    }

    return (
      <div className="greeting" onClick={this.handleClick}>
        <h1>Hi, {identifier}!</h1>
      </div>
    );
  }
});

module.exports = Greeting;
