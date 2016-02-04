var Dispatcher = require('../dispatcher/dispatcher'),
    OnboardingConstants = require('../constants/onboarding_constants');

var OnboardingActions = {
  receiveErrors: function (errors) {
    Dispatcher.dispatch({
      actionType: OnboardingConstants.RECEIVE_ERRORS,
      errors: errors
    });
  },

  shopExistance: function (status) {
    Dispatcher.dispatch({
      actionType: OnboardingConstants.SHOP_EXISTANCE,
      status: status
    });
  }
};

module.exports = OnboardingActions;
