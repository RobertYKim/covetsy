var CurrentUserActions = require('../actions/current_user_actions'),
    AuthFormActions = require('../actions/auth_form_actions');

var SessionsApiUtil = {
  signin: function (data) {
    $.ajax({
      type: "POST",
      url: "api/session",
      data: {user: data},
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
      },
      error: function (errors) {
        AuthFormActions.receiveErrors([errors.responseJSON]);
      }
    });
  },

  signout: function () {
    $.ajax({
      type: "DELETE",
      url: "api/session",
      success: function () {
        CurrentUserActions.resetCurrentUser();
      }
    });
  },

  fetchCurrentUser: function (callback) {
    $.ajax({
      type: "GET",
      url: "api/session",
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        if (callback) {
          callback(currentUser);
        }
      }
    });
  }
};

module.exports = SessionsApiUtil;
