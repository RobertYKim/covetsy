var Dispatcher = require('../dispatcher/dispatcher'),
    ProfileConstants = require('../constants/profile_constants');

var ProfileActions = {
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
