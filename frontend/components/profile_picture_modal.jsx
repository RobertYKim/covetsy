var React = require('react'),
    ProfilePictureModalActions =
      require('../actions/profile_picture_modal_actions');

ProfilePictureModal = React.createClass({
  handleClick: function (event) {
    if (event.target.className === "profile-picture-modal") {
      ProfilePictureModalActions.hideProfilePictureModal();
    }
  },

  render: function () {
    return (
      <div className="profile-picture-modal" onClick={this.handleClick}>
        <div className="profile-picture-modal-form">
          <div className="profile-picture-modal-form-title">
            <h4>Add a profile photo</h4>
          </div>
          <div className="profile-picture-modal-form-content">
            <div className="profile-picture-modal-form-content-image">
              <span className="fa fa-user fa-5x"></span>
            </div>
            <h3 className="profile-picture-modal-form-content-instructions">
              Upload your profile photo.
            </h3>
            <h3>This should clearly show your smiling face.</h3>
            <h3>
              Must be a .jpg, .gif or .png file smaller than 10MB and at least
              400 pixels square.
            </h3>
            <div className="profile-picture-modal-upload">
              <div className="profile-picture-modal-upload-button">
                Choose a file
              </div>
              <input
              className="profile-picture-modal-upload-input"
              type="file"
              onChange={this.changeFile}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProfilePictureModal;
