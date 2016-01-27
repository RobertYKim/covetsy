var Dispatcher = require('../dispatcher/dispatcher'),
    AuthFormConstants = require('../constants/auth_form_constants');

var AuthFormActions = {
  showAuthForm: function (type) {
    Dispatcher.dispatch({
      actionType: AuthFormConstants.SHOW_AUTH_FORM,
      type: type
    });
  },

  updateVisiblity: function (visibility) {
    Dispatcher.dispatch({
      actionType: AuthFormConstants.UPDATE_VISIBILITY,
      visibility: visibility
    });
  }
};

module.exports = AuthFormActions;
