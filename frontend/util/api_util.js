var ApiUtil = {
  createUser: function (data) {
    $.ajax({
      type: "POST",
      url: "api/users",
      success: function (user) {
        ApiActions.receiveUser(user);
      }
    });
  }
};

module.exports = ApiUtil;
