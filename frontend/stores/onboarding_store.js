var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    OnboardingConstants = require('../constants/onboarding_constants');

var _errors,
    _status,
    _created;

var OnboardingStore = new Store(Dispatcher);

OnboardingStore.errors = function () {
  return _errors;
};

OnboardingStore.existingStore = function () {
  return _status;
};

OnboardingStore.shopCreated = function () {
  return _created;
};

OnboardingStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case OnboardingConstants.RECEIVE_ERRORS:
      _errors = payload.errors;
      OnboardingStore.__emitChange();
      break;
    case OnboardingConstants.SHOP_EXISTANCE:
      _status = payload.status;
      OnboardingStore.__emitChange();
      break;
    case OnboardingConstants.SHOP_CREATED:
      _created = true;
      OnboardingStore.__emitChange();
      break;
  }
};

module.exports = OnboardingStore;
