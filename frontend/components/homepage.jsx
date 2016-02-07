var React = require('react'),
    Greeting = require('./greeting'),
    Hero = require('./hero'),
    Discover = require('./discover');

var Homepage = React.createClass({
  render: function () {
    var signedIn,
        greeting,
        hero,
        discover;
    if (this.props.signedIn) {
      signedIn = true;
      greeting = <Greeting currentUser={this.props.currentUser}/>;
      discover = <Discover />;
    } else {
      signedIn = false;
      hero = <Hero shopName="CraftCoding"/>;
      discover = <Discover />;
    }

    return (
      <div className="homepage">
        {greeting}
        {hero}
        {discover}
      </div>
    );
  }
});

module.exports = Homepage;
