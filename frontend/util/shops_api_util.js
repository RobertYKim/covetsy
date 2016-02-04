var ShopActions = require('../actions/shop_actions'),
    OnboardingActions = require('../actions/onboarding_actions');

var ShopsApiUtil = {
  createShop: function (data, callback) {
    $.ajax({
      type: "POST",
      url: "api/shops",
      data: {shop: data},
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
  }
};

module.exports = ShopsApiUtil;
