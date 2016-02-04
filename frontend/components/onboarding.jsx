var React = require('react'),
    CurrentUserStore = require('../stores/current_user_store'),
    ShopsApiUtil = require('../util/shops_api_util'),
    UsersApiUtil = require('../util/users_api_util');

var Onboarding = React.createClass({
  handleChange: function (event) {
    var id = event.target.id;
    var value = event.target.value;
    var nonword = /\W/;
    if (id === "shop-name") {
      var oldState = this.state.shop_name;
      if (nonword.test(value)) {
        this.setState({shop_name: oldState});
      } else {
        this.setState({shop_name: value});
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
    if (this.validShopName(this.state.shop_name)) {
      ShopsApiUtil.createShop(
        this.state,
        UsersApiUtil.editUser({shop_owner: true})
      );
    }
  },

  validShopName: function (name) {
    if (name.length >= 4 && name.length <= 20) {
      return true;
    }
    return false;
  },

  getInitialState: function () {
    return ({
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

    return (
      <form className="onboarding-form" onSubmit={this.handleSubmit}>
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
                value={this.state.shop_name}></input>
              <button>Check availability</button>
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
        <button>Create shop</button>
      </form>


    );
  }
});

module.exports = Onboarding;
