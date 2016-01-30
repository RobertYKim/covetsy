var React = require('react');

var Hero = React.createClass({
// <img src={window.covetsy_assets.background}/>
  render: function () {
    return (
      <div className="hero">
        <div className="hero-body">
          <h1>Shop directly from people around the world.</h1>
        </div>
        <div className="hero-overlay">
        </div>
      </div>
    );
  }
});

module.exports = Hero;
