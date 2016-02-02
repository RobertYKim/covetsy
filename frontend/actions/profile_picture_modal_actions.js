var Dispatcher = require('../dispatcher/dispatcher'),
    ProfilePictureModalConstants =
      require('../constants/profile_picture_modal_constants');

var ProfilePictureModalActions = {
  showProfilePictureModal: function () {
    Dispatcher.dispatch({
      actionType: ProfilePictureModalConstants.SHOW_PROFILE_PICTURE_MODAL
    });
  }
};

module.exports = ProfilePictureModalActions;
