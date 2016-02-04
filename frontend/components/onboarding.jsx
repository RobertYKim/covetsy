var React = require('react');

var Onboarding = React.createClass({
  render: function () {
    var shopLanguage =
      <li className="group">
        <label htmlFor="shop-language">Shop language</label>
        <select id="shop-language" defaultValue="english">
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
        <select id="shop-country" defaultValue="unitedStates">
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
        <select id="shop-currency" defaultValue="usd">
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
      <form className="onboarding-form">
        <div className="onboarding-form-title-name">
          <h3>Name your shop</h3>
          <h4>Choose a memorable name that reflects your style.</h4>
          <div className="onboarding-form-name-form">
            <div className="onboarding-form-name-input group">
              <input type="text" placeholder="Enter your shop name"></input>
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
