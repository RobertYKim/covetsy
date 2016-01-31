var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    AuthFormConstants = require('../constants/auth_form_constants');

var _visible,
    _type,
    _errors;

var AuthFormStore = new Store(Dispatcher);

AuthFormStore.state = function () {
  return {visibility: _visible, type: _type, errors: _errors};
};

AuthFormStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AuthFormConstants.RECEIVE_ERRORS:
      _errors = payload.errors;
      AuthFormStore.__emitChange();
      break;
    case AuthFormConstants.SHOW_AUTH_FORM:
      _visible = true;
      _type = payload.type;
      AuthFormStore.__emitChange();
      break;
    case AuthFormConstants.UPDATE_VISIBILITY:
      _visible = payload.visibility;
      AuthFormStore.__emitChange();
      break;
  }
};

module.exports = AuthFormStore;
