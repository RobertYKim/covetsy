var Dispatcher = require('../dispatcher/dispatcher'),
    ProfileConstants = require('../constants/profile_constants');

var ProfileActions = {
  resetUser: function () {
    Dispatcher.dispatch({
      actionType: ProfileConstants.RESET_USER
    });
  },

  receiveUser: function (user) {
    Dispatcher.dispatch({
      actionType: ProfileConstants.RECEIVE_USER,
      user: user
    });
  },

  receiveErrors: function (errors) {
    Dispatcher.dispatch({
      actionType: ProfileConstants.RECEIVE_ERRORS,
      errors: errors
    });
  }
};

module.exports = ProfileActions;
