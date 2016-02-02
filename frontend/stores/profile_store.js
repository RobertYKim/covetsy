var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    ProfileConstants = require('../constants/profile_constants');

var _userHasBeenFetched = false;
var _user,
    _errors;

var ProfileStore = new Store(Dispatcher);

ProfileStore.profile = function () {
  return {user: _user, errors: _errors};
};

ProfileStore.userHasBeenFetched = function () {
  return _userHasBeenFetched;
};

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ProfileConstants.RECEIVE_USER:
      _user = payload.user;
      _userHasBeenFetched = true;
      ProfileStore.__emitChange();
      break;
    case ProfileConstants.RECEIVE_ERRORS:
      _errors = payload.errors;
      ProfileStore.__emitChange();
      break;
  }
};

module.exports = ProfileStore;
