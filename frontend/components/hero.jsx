var React = require('react');

var Hero = React.createClass({

  render: function () {
    return (
      <div className="hero">
        <div className="hero-body">
          <h1>Shop directly from people around the world.</h1>
          <div className="hero-space"></div>
          <div className="hero-seller">
            <div className="hero-seller-picture"></div>
            <div className="hero-seller-info">
              <p className="name-store">
                Robert of <a href="#" onClick={this.handleClick}>CraftCoding</a>
              </p>
              <p className="location">New York, New York</p>
            </div>
          </div>
        </div>
        <div className="hero-overlay">
        </div>
      </div>
    );
  }
});

module.exports = Hero;
