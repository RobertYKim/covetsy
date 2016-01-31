var Dispatcher = require('../dispatcher/dispatcher'),
    ProfileModalConstants = require('../constants/profile_modal_constants');

var ProfileModalActions = {
  hideProfileModal: function () {
    Dispatcher.dispatch({
      actionType: ProfileModalConstants.HIDE_PROFILE_MODAL
    });
  },

  showProfileModal: function () {
    Dispatcher.dispatch({
      actionType: ProfileModalConstants.SHOW_PROFILE_MODAL
    });
  }
};

module.exports = ProfileModalActions;
