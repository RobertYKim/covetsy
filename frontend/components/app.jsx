var React = require('react'),
    Header = require('./header');

var App = React.createClass({
  getInitialState: function () {
    return {authFormVisible: false};
  },

  render: function () {
    var authForm;
    if (this.state.authFormVisible) {
      authForm = <authForm />;
    }

    return (
      <div>
        <Header />
        {this.props.children}
        {authForm}
      </div>
    );
  }
});

module.exports = App;
