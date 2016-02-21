var React = require('react'),
    History = require('react-router').History,
    AuthFormActions = require('../actions/auth_form_actions'),
    ProfileModalActions = require('../actions/profile_modal_actions'),
    CurrentUserStore = require('../stores/current_user_store');

var Sell = React.createClass({
  mixins: [History],

  handleClick: function (event) {
    event.preventDefault();
    if (event.target.className === "sell-hero-link") {
      if (CurrentUserStore.isSignedIn()) {
        this.history.pushState(null, 'onboarding', {});
      } else {
        AuthFormActions.showAuthForm("signin");
      }
    } else if (event.target.className !== "profile-modal") {
      ProfileModalActions.hideProfileModal();
    }
  },

  render: function () {
    return (
      <div className="sell-hero" onClick={this.handleClick}>
        <div className="sell-hero-space"></div>
        <h1>Millions of shoppers can't wait to see what you have in store</h1>
        <a className="sell-hero-link" href="#" onClick={this.handleClick}>
          Open your covEtsy shop
        </a>
      </div>
    );
  }
});

module.exports = Sell;
