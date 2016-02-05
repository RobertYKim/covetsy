var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    ShopConstants = require('../constants/shop_constants');

var _shopHasBeenFetched = false;
var _shop;

var ShopStore = new Store(Dispatcher);

ShopStore.shop = function () {
  return _shop;
};

ShopStore.shopHasBeenFetched = function () {
  return _shopHasBeenFetched;
};

ShopStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ShopConstants.RECEIVE_SHOP:
      _shop = payload.shop;
      _shopHasBeenFetched = true;
      ShopStore.__emitChange();
      break;
  }
};

module.exports = ShopStore;
