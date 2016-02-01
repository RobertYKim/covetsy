var CurrentUserActions = require('../actions/current_user_actions'),
    AuthFormActions = require('../actions/auth_form_actions');

var UsersApiUtil = {
  createUser: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "api/users",
      data: {user: data},
      success: function (user) {
        CurrentUserActions.receiveCurrentUser(user);
        if (callback) {
          callback();
        }
      },
      error: function (errors) {
        AuthFormActions.receiveErrors(errors.responseJSON);
      }
    });
  }
};

module.exports = UsersApiUtil;
