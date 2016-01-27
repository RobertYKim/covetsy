var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    AuthFormConstants = require('../constants/auth_form_constants');

var _visible;
var _type;

var AuthFormStore = new Store(Dispatcher);

AuthFormStore.state = function () {
  return {visibility: _visible, type: _type};
};

AuthFormStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
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
