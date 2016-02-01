var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    ProfileConstants = require('../constants/profile_constants');

var _visible;

var ProfileStore = new Store(Dispatcher);

ProfileStore.state = function () {
  return {visibility: _visible};
};

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ProfileConstants.SHOW_PROFILE:
      _visible = true;
      ProfileStore.__emitChange();
      break;
  }
};

module.exports = ProfileStore;
