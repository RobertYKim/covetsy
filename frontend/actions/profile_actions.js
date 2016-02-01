var Dispatcher = require('../dispatcher/dispatcher'),
    ProfileConstants = require('../constants/profile_constants');

var ProfileActions = {
  showProfile: function (user) {
    Dispatcher.dispatch({
      actionType: ProfileConstants.SHOW_PROFILE,
      user: user
    });
  }
};

module.exports = ProfileActions;
