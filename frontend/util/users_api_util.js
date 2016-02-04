var CurrentUserActions = require('../actions/current_user_actions'),
    AuthFormActions = require('../actions/auth_form_actions'),
    ProfileActions = require('../actions/profile_actions');

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
  },

  fetchUser: function (username, callback) {
    $.ajax({
      type: "GET",
      url: "api/users/:id",
      data: {username: username},
      success: function (user) {
        ProfileActions.receiveUser(user);
        if (callback) {
          callback();
        }
      },
      error: function (errors) {
        ProfileActions.receiveErrors(errors.responseJSON);
      }
    });
  },

  editUser: function (data, callback) {
    $.ajax({
      type: "PATCH",
      url: "api/users/:id",
      data: {user: data},
      success: function (user) {
        ProfileActions.receiveUser(user);
        if (callback) {
          callback();
        }
      }
    });
  },

  editUserPhoto: function (formData, callback) {
    $.ajax({
      type: "PATCH",
      url: "api/users/:id",
      processData: false,
      contentType: false,
      data: formData,
      success: function (user) {
        ProfileActions.receiveUser(user);
        if (callback) {
          callback();
        }
      }
    });
  }
};

module.exports = UsersApiUtil;
