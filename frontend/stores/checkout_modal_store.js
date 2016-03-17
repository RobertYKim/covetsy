var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    CheckoutModalConstants = require('../constants/checkout_modal_constants');

var _visible;

var CheckoutModalStore = new Store(Dispatcher);

CheckoutModalStore.state = function () {
  return {visibility: _visible};
};

CheckoutModalStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CheckoutModalConstants.HIDE_CHECKOUT_MODAL:
      _visible = false;
      CheckoutModalStore.__emitChange();
      break;
    case CheckoutModalConstants.SHOW_CHECKOUT_MODAL:
      _visible = true;
      CheckoutModalStore.__emitChange();
      break;
  }
};

module.exports = CheckoutModalStore;
