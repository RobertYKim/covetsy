var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants');

var _user;

var UserStore = new Store(Dispatcher);

UserStore.user = function () {
  return _user;
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.RECEIVE_USER:
      _user = payload.user;
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
