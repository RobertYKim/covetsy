var CurrentUserActions = require('../actions/current_user_actions'),
    CookieActions = require('../actions/cookie_actions'),
    AuthFormActions = require('../actions/auth_form_actions');

var SessionsApiUtil = {
  signin: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "api/session",
      data: {user: data},
      success: function (currentUser) {
        CookieActions.updateCart(currentUser.cart)
        CurrentUserActions.receiveCurrentUser(currentUser);
        if (callback) {
          callback();
        }
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
