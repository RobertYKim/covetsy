var React = require('react');

var Cart = React.createClass({

  render: function () {
    var empty;
    empty =
      <div className="cart-empty">Your cart is empty.</div>;

    return (
      <div className="cart">
        <div className="cart-container">
          {empty}

        </div>
      </div>
    );
  }
});

module.exports = Cart;
