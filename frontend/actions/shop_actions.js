var Dispatcher = require('../dispatcher/dispatcher'),
    ShopConstants = require('../constants/shop_constants');

var ShopActions = {
  receiveShop: function (shop) {
    Dispatcher.dispatch({
      actionType: ShopConstants.RECEIVE_SHOP,
      shop: shop
    });
  }
};

module.exports = ShopActions;
