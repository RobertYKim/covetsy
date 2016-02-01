var Dispatcher = require('../dispatcher/dispatcher'),
    AuthFormConstants = require('../constants/auth_form_constants');

var AuthFormActions = {
  receiveErrors: function (errors) {
    Dispatcher.dispatch({
      actionType: AuthFormConstants.RECEIVE_ERRORS,
      errors: errors
    });
  },

  showAuthForm: function (type) {
    Dispatcher.dispatch({
      actionType: AuthFormConstants.SHOW_AUTH_FORM,
      type: type
    });
  },

  hideAuthForm: function () {
    Dispatcher.dispatch({
      actionType: AuthFormConstants.HIDE_AUTH_FORM,
    });
  }
};

module.exports = AuthFormActions;
