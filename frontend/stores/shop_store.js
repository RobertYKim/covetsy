var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    ShopConstants = require('../constants/shop_constants');

var _shop;

var ShopStore = new Store(Dispatcher);

ShopStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ShopConstants.RECEIVE_SHOP:
      _shop = payload.shop;
      ShopStore.__emitChange();
      break;
  }
};

module.exports = ShopStore;
