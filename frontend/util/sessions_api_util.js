var CurrentUserActions = require('../actions/current_user_actions');

var SessionsApiUtil = {
  fetchCurrentUser: function (callback) {
    $.ajax({
      type: "GET",
      url: "api/session",
      success: function (currentUser) {
        console.log("fetched current user!");
        CurrentUserActions.receiveCurrentUser(currentUser);
        if (callback) {
          callback(currentUser);
        }
      }
    });
  }
};

module.exports = SessionsApiUtil;
