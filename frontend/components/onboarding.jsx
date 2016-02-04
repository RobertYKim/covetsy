var React = require('react'),
    ShopStore = require('../stores/shop_store'),
    OnboardingStore = require('../stores/onboarding_store'),
    CurrentUserStore = require('../stores/current_user_store'),
    ShopsApiUtil = require('../util/shops_api_util');

var Onboarding = React.createClass({
  _shopStoreChanged: function () {
    var shop = ShopStore.shop();
    if (shop.shop_name === this.state.shop_name) {
      this.setState({invalidShopName: true});
    } else {
      this.setState({invalidShopName: false});
    }
  },

  _onboardingStoreChanged: function () {
    var json = OnboardingStore.existingStore();
    var status = json[0] === "true" ? true : false;
    this.setState({nameTaken: status, checkedName: this.state.shop_name});
  },

  handleBlur: function (event) {
    this.validateShopName(this.state.shop_name);
    this.setState({unfocusedShopName: true});
  },

  handleClick: function (event) {
    if (event.target.className !== "submit") {
      event.preventDefault();
      this.setState({clickedShopName: true});
    }
  },

  handleChange: function (event) {
    var id = event.target.id;
    var value = event.target.value;
    var nonword = /\W/;
    if (id === "shop-name") {
      var oldState = this.state.shop_name;
      if (nonword.test(value)) {
        this.setState({
          shop_name: oldState,
          unfocusedShopName: false,
          nameTaken: "notYetChecked"
        });
      } else {
        this.setState({
          shop_name: value,
          unfocusedShopName: false,
          nameTaken: "notYetChecked"
        });
      }
    } else if (id === "shop-language") {
      this.setState({language: value});
    } else if (id === "shop-country") {
      this.setState({country: value});
    } else if (id === "shop-currency") {
      this.setState({currency: value});
    } else if (id === "full-time") {
      this.setState({seller_type: value});
    } else if (id === "part-full") {
      this.setState({seller_type: value});
    } else if (id === "part-time") {
      this.setState({seller_type: value});
    } else if (id === "other") {
      this.setState({seller_type: value});
    }
  },

  handleSubmit: function (event) {
    event.preventDefault();
    if (
      !this.state.nameTaken &&
      this.state.checkedName === this.state.shop_name
    ) {
      ShopsApiUtil.createShop(this.state);
    }
  },

  validateShopName: function (name) {
    if (
      this.state.clickedShopName &&
      this.validShopNameLength(name)
    ) {
      ShopsApiUtil.shopExists(name);
    } else {
      this.setState({invalidShopName: true});
    }
  },

  validShopNameLength: function (name) {
    if (name.length >= 4 && name.length <= 20) {
      return true;
    }
    return false;
  },

  getInitialState: function () {
    return ({
      clickedShopName: false,
      invalidShopName: true,
      nameTaken: "notYetChecked",
      shop_name: "",
      language: "english",
      country: "unitedStates",
      currency: "usd",
      seller_type: "other"
    });
  },

  componentDidMount: function () {
    var user = CurrentUserStore.currentUser();
    this.setState({user_id: user.id});
    this.shopStoreListener = ShopStore.addListener(this._shopStoreChanged);
    this.onboardingStoreListener =
      OnboardingStore.addListener(this._onboardingStoreChanged);
  },

  componentWillUnmount: function () {
    this.shopStoreListener.remove();
  },

  render: function () {
    var shopLanguage =
      <li className="group">
        <label htmlFor="shop-language">Shop language</label>
        <select
          id="shop-language"
          onChange={this.handleChange}
          value={this.state.language}>
          <option value="german">Deutsch</option>
          <option value="english">English</option>
          <option value="spanish">Español</option>
          <option value="french">Français</option>
          <option value="italian">Italiano</option>
          <option value="japanese">日本語</option>
          <option value="dutch">Nederlands</option>
          <option value="portugese">Portugês</option>
          <option value="russian">Русский</option>
        </select>
        <div>
          <p>The language you'll use to describe your items.</p>
        </div>
      </li>;

    var shopCountry =
      <li className="group">
        <label htmlFor="shop-country">Shop country</label>
        <select
          id="shop-country"
          onChange={this.handleChange}
          value={this.state.country}>
          <option value="australia">Australia</option>
          <option value="canada">Canada</option>
          <option value="france">France</option>
          <option value="germany">Germany</option>
          <option value="greece">Greece</option>
          <option value="ireland">Ireland</option>
          <option value="italy">Italy</option>
          <option value="japan">Japan</option>
          <option value="newZealand">New Zealand</option>
          <option value="portugal">Portugal</option>
          <option value="russia">Russia</option>
          <option value="spain">Spain</option>
          <option value="theNetherlands">The Netherlands</option>
          <option value="unitedKingdom">United Kingdom</option>
          <option value="unitedStates">United States</option>
        </select>
        <div>
          <p>Where is your shop based?</p>
        </div>
      </li>;

    var shopCurrency =
      <li className="group">
        <label htmlFor="shop-currency">Shop currency</label>
        <select
          id="shop-currency"
          onChange={this.handleChange}
          value={this.state.currency}>
          <option value="usd">$ United States Dollar</option>
          <option value="cad">$ Canadian Dollar</option>
          <option value="eur">€ Euro</option>
          <option value="gbp">£ British Pound</option>
          <option value="aud">$ Australian Dollar</option>
          <option value="jpy">¥ Japanese Yen</option>
        </select>
        <div>
          <p>
            The currency you'll use to price your items. Shoppers in other
            countries will automatically see prices in their local currency.
          </p>
        </div>
      </li>;

    var sellerType =
      <li className="group">
        <label>Which of these best describes you?</label>
        <ul>
          <li>
            <input
              onChange={this.handleChange}
              checked={this.state.seller_type === "full"}
              id="full-time"
              value="full"
              name="type"
              type="radio"/>
            <label htmlFor="full-time">
              Selling is my full-time job
            </label>
          </li>
          <li>
            <input
              onChange={this.handleChange}
              checked={this.state.seller_type === "partfull"}
              id="part-full"
              value="partfull"
              name="type"
              type="radio"/>
            <label htmlFor="part-full">
              I sell part-time but hope to sell full-time
            </label>
          </li>
          <li>
            <input
              onChange={this.handleChange}
              checked={this.state.seller_type === "part"}
              id="part-time"
              value="part"
              name="type"
              type="radio"/>
            <label htmlFor="part-time">
              I sell part-time and that's how I like it
            </label>
          </li>
          <li>
            <input
              onChange={this.handleChange}
              checked={this.state.seller_type === "other"}
              id="other"
              value="other"
              name="type"
              type="radio"/>
            <label htmlFor="other">
              Other
            </label>
          </li>
        </ul>
        <div>
          <p>
            This is just an FYI for us, and won’t affect the opening of your
            shop.
          </p>
        </div>
      </li>;

    var shopNameMessage;
    if (
      this.state.clickedShopName &&
      this.state.unfocusedShopName &&
      this.validShopNameLength(this.state.shop_name)
    ) {
      if (this.state.nameTaken === "notYetChecked") {
        shopNameMessage = <h5>Checking...</h5>;
      } else if (this.state.nameTaken) {
        shopNameMessage =
          <h5 className="red">
            Shucks, that name’s already been used by another covEtsy member.
            Please try another one.
          </h5>;
      } else {
        shopNameMessage = <h5 className="green">Available</h5>;
      }
    } else if (
      this.state.clickedShopName &&
      this.state.unfocusedShopName &&
      !this.validShopNameLength(this.state.shop_name)
    ) {
      shopNameMessage =
        <h5 className="red">Shop names must have 4-20 characters.</h5>;
    }

    return (
      <form
        className="onboarding-form"
        onClick={this.handleClick}
        onSubmit={this.handleSubmit}>
        <div className="onboarding-form-title-name">
          <h3>Name your shop</h3>
          <h4>Choose a memorable name that reflects your style.</h4>
          <div className="onboarding-form-name-form">
            <div className="onboarding-form-name-input group">
              <input
                id="shop-name"
                type="text"
                placeholder="Enter your shop name"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.state.shop_name}
                onClick={this.handleClick}></input>
              <button className="check" onClick={this.handleClick}>
                Check availability
              </button>
              {shopNameMessage}
            </div>
            <p>
              Your shop name will appear in your shop and next to each of your
              listings throughout covEtsy. You can later change it if you'd
              like.
            </p>
          </div>
        </div>
        <div className="onboarding-form-title-preferences">
          <h3>Shop preferences</h3>
          <h4>Let's get started! Tell us about you and your shop.</h4>
          <div className="onboarding-form-preferences-form">
            <ul>
              {shopLanguage}
              {shopCountry}
              {shopCurrency}
              {sellerType}
            </ul>
          </div>
        </div>
        <button className="submit">Create shop</button>
      </form>
    );
  }
});

module.exports = Onboarding;
