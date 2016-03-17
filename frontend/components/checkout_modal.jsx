var React = require('react'),
    CheckoutModalActions = require('../actions/checkout_modal_actions');

var CheckoutModal = React.createClass({
  handleClick: function (event) {
    if (event.target.className === "overlay") {
      CheckoutModalActions.hideCheckoutModal();
    }
  },

  render: function () {
    return (
      <div className="overlay" onClick={this.handleClick}>
        <div className="checkout-modal">
          <h3>Thanks for visiting covEtsy!</h3>
          <p>
            Unfortunately you can't buy any of these items, but if you enjoyed
            this app, check out more about me and my work below!
          </p>
          <div className="checkout-links group">
            <div className="checkout-github">
              <a href="https://www.github.com/RobertYKim" target="_blank">
                <div className="github-icon"></div>
              </a>
              <a href="https://www.github.com/RobertYKim" target="_blank">
                Github
              </a>
            </div>
            <div className="checkout-linkedin">
              <a href="https://www.linkedin.com/in/RobYKim" target="_blank">
                <div className="linkedin-icon"></div>
              </a>
              <a href="https://www.linkedin.com/in/RobYKim" target="_blank">
                LinkedIn
              </a>
            </div>
            <div className="checkout-home">
              <a href="http://www.robkim.io" target="_blank">
                <div className="home-icon"></div>
              </a>
              <a href="http://www.robkim.io" target="_blank">
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CheckoutModal;
