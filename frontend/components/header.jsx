var React = require('react'),
    AuthForm = require('./auth_form');

var Header = React.createClass({
  getInitialState: function () {
    return ({
      modalVisible: false,
      modalType: ""
    });
  },

  toggleAuthModalJoin: function (event) {
    event.preventDefault();
    if (this.state.modalVisible) {
      this.setState({modalVisible: false});
    } else {
      this.setState({
        modalVisible: true,
        modalType: "register"
      });
    }
  },

  toggleAuthModalSignin: function (event) {
    event.preventDefault();
    if (this.state.modalVisible) {
      this.setState({modalVisible: false});
    } else {
      this.setState({
        modalVisible: true,
        modalType: "signin"
      });
    }
  },

  closeModal: function (event) {
    event.preventDefault();
    this.setState({modalVisible: false});
  },

  registerModal: function (event) {
    event.preventDefault();
    this.setState({modalType: "register"});
  },

  signinModal: function (event) {
    event.preventDefault();
    this.setState({modalType: "signin"});
  },

  render: function () {
    var authForm;

    if (this.state.modalVisible) {
      authForm = <AuthForm
                    modalType={this.state.modalType}
                    closeModal={this.closeModal}
                    registerModal={this.registerModal}
                    signinModal={this.signinModal} />;
    }

    return (
      <div className="header">
        <div className="global-nav group">
          <div className="global-nav-logo-search">
            <a className="logo" href="#">Covetsy</a>
          </div>

          <div className="global-nav-links">
            <a
              className="register"
              href="#"
              onClick={this.toggleAuthModalJoin}>Register</a>
            <a
              className="signin"
              href="#"
              onClick={this.toggleAuthModalSignin}>Sign in</a>
          </div>
        </div>
        {authForm}
      </div>
    );
  }
});

module.exports = Header;
