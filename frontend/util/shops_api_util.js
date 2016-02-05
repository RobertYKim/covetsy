var ShopActions = require('../actions/shop_actions'),
    OnboardingActions = require('../actions/onboarding_actions');

var ShopsApiUtil = {
  createShop: function (shop, callback) {
    $.ajax({
      type: "POST",
      url: "api/shops",
      data: {shop: shop},
      success: function (shop) {
        ShopActions.receiveShop(shop);
        if (callback) {
          callback();
        }
      },
      error: function (errors) {
        OnboardingActions.receiveErrors(errors.responseJSON);
      }
    });
  },

  fetchShop: function (shop_name, callback) {
    $.ajax({
      type: "GET",
      url: "api/shops/:id",
      data: {shop_name: shop_name},
      success: function (shop) {
        ShopActions.receiveShop(shop);
        if (callback) {
          callback();
        }
      },
      error: function (errors) {
        OnboardingActions.receiveErrors(errors.responseJSON);
      }
    });
  },

  shopExists: function (shop_name) {
    $.ajax({
      type: "GET",
      url: "api/shops/exists",
      data: {shop_name: shop_name},
      success: function (status) {
        OnboardingActions.shopExistance(status);
      },
    });
  }
};

module.exports = ShopsApiUtil;
