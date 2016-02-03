var React = require('react'),
    ProfilePictureModalActions =
      require('../actions/profile_picture_modal_actions');

ProfilePictureModal = React.createClass({
  handleClick: function (event) {
    if (event.target.className === "profile-picture-modal") {
      ProfilePictureModalActions.hideProfilePictureModal();
    }
  },

  cancelImage: function (event) {
    event.preventDefault();
    this.setState({imageFile: null, imageUrl: ""});
  },

  submitImage: function (event) {
    event.preventDefault();
  },

  changeFile: function(event) {
    var reader = new FileReader();
    var file = event.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  getInitialState: function () {
    return ({
      imageFile: null,
      imageUrl: ""
    });
  },

  render: function () {
    var image;
    if (this.state.imageUrl) {
      image = <img src={this.state.imageUrl}></img>;
    } else {
      image = <span className="fa fa-user fa-5x"></span>;
    }

    var instructions;
    if (this.state.imageUrl) {
      instructions =
        <div className="profile-picture-modal-form-content-instructions">
          <h3>How's it look?</h3>
        </div>;
    } else {
      instructions =
        <div className="profile-picture-modal-form-content-instructions">
          <h3>Upload your profile photo.</h3>
          <h3>This should clearly show your smiling face.</h3>
          <h3>
            Must be a .jpg, .gif or .png file smaller than 10MB and at least
            400 pixels square.
          </h3>
        </div>;
    }

    var buttons;
    if (this.state.imageUrl) {
      buttons =
        <div className="profile-picture-modal-cancel-submit">
          <a href="#" onClick={this.cancelImage}>Go back</a>
          <a href="#" onClick={this.submitImage}>Save</a>
        </div>;
    } else {
      buttons =
        <div className="profile-picture-modal-upload">
          <div className="profile-picture-modal-upload-button">
            Choose a file
          </div>
          <input
          className="profile-picture-modal-upload-input"
          type="file"
          onChange={this.changeFile}/>
        </div>;
    }

    return (
      <div className="profile-picture-modal" onClick={this.handleClick}>
        <div className="profile-picture-modal-form">
          <div className="profile-picture-modal-form-title">
            <h4>Add a profile photo</h4>
          </div>
          <div className="profile-picture-modal-form-content">
            <div className="profile-picture-modal-form-content-image">
              {image}
            </div>
              {instructions}
              {buttons}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProfilePictureModal;
