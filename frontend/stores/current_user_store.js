var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    CurrentUserConstants = require('../constants/current_user_constants');

var _currentUser = {};
var CurrentUserStore = new Store(Dispatcher);

CurrentUserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CurrentUserConstants.RECEIVE_CURRENT_USER:
      _currentUser = payload.currentUser;
      CurrentUserStore.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
