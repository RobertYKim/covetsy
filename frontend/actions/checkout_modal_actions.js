var Dispatcher = require('../dispatcher/dispatcher'),
    CheckoutModalConstants = require('../constants/checkout_modal_constants');

var CheckoutModalActions = {
  hideCheckoutModal: function () {
    Dispatcher.dispatch({
      actionType: CheckoutModalConstants.HIDE_CHECKOUT_MODAL
    });
  },

  showCheckoutModal: function () {
    Dispatcher.dispatch({
      actionType: CheckoutModalConstants.SHOW_CHECKOUT_MODAL
    });
  }
};

module.exports = CheckoutModalActions;
