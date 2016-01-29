var UserActions = require('../actions/user_actions'),
    CurrentUserActions = require('../actions/current_user_actions');

var UsersApiUtil = {
  createUser: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "api/users",
      data: {user: data},
      success: function (user) {
        UserActions.receiveUser(user);
        CurrentUserActions.receiveCurrentUser(user);
        if (callback) {
          callback();
        }
      }
    });
  }
};

module.exports = UsersApiUtil;
