var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    ProfilePictureModalConstants = require('../constants/profile_picture_modal_constants');

var _visible;

var ProfilePictureModalStore = new Store(Dispatcher);

ProfilePictureModalStore.state = function () {
  return {visibility: _visible};
};

ProfilePictureModalStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ProfilePictureModalConstants.SHOW_PROFILE_PICTURE_MODAL:
      _visible = true;
      ProfilePictureModalStore.__emitChange();
      break;
  }
};

module.exports = ProfilePictureModalStore;
