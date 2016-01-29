var Dispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants');

var UserActions = {
  receiveUser: function (user) {
    Dispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USER,
      user: user
    });
  }
};

module.exports = UserActions;
