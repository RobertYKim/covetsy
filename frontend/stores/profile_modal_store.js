var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    ProfileModalConstants = require('../constants/profile_modal_constants');

var _visible;

var ProfileModalStore = new Store(Dispatcher);

ProfileModalStore.state = function () {
  return {visibility: _visible};
};

ProfileModalStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ProfileModalConstants.HIDE_PROFILE_MODAL:
      _visible = false;
      ProfileModalStore.__emitChange();
      break;
    case ProfileModalConstants.SHOW_PROFILE_MODAL:
      _visible = true;
      ProfileModalStore.__emitChange();
      break;
  }
};

module.exports = ProfileModalStore;
