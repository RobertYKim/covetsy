var React = require('react'),
    ProfileModalActions = require('../actions/profile_modal_actions');

var ProfileModal = React.createClass({
  handleClick: function (event) {
    event.preventDefault();
    if (event.target.className === "profile-modal-overlay") {
      ProfileModalActions.hideProfileModal();
    }
  },

  render: function () {
    return (
      <div className="profile-modal" onClick={this.handleClick}>
        I am a ProfileModal
      </div>
    );
  }
});

module.exports = ProfileModal;
