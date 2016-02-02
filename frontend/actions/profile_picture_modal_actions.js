var Dispatcher = require('../dispatcher/dispatcher'),
    ProfilePictureModalConstants =
      require('../constants/profile_picture_modal_constants');

var ProfilePictureModalActions = {
  hideProfilePictureModal: function () {
    Dispatcher.dispatch({
      actionType: ProfilePictureModalConstants.HIDE_PROFILE_PICTURE_MODAL
    });
  },

  showProfilePictureModal: function () {
    Dispatcher.dispatch({
      actionType: ProfilePictureModalConstants.SHOW_PROFILE_PICTURE_MODAL
    });
  }
};

module.exports = ProfilePictureModalActions;
