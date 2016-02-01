var React = require('react'),
    ProfileModalActions = require('../actions/profile_modal_actions');

var Discover = React.createClass({
  handleClick: function (event) {
    debugger
    event.preventDefault();
    ProfileModalActions.hideProfileModal();
  },

  render: function () {
    return (
      <div className="discover" onClick={this.handleClick}>
        <div className="discover-body">
          <h2>Discover items you can't find anywhere else</h2>
        </div>
      </div>
    );
  }
});

module.exports = Discover;
