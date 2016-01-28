var React = require('react'),
    AuthFormActions = require('../actions/auth_form_actions');

var AuthForm = React.createClass({
  handleClick: function (event) {
    if (event.target.className === "overlay") {
      event.preventDefault();
      this.props.toggleVisibility();
    } else if (event.target.text === "Register") {
      event.preventDefault();
      AuthFormActions.showAuthForm("register");
    } else if (event.target.text === "Sign In") {
      event.preventDefault();
      AuthFormActions.showAuthForm("signin");
    }
  },

  handleChange: function (event) {
    var id = event.target.id;
    var value = event.target.value;
    if (id === "first-name") {
      this.setState({firstName: value});
    } else if (id === "last-name") {
      this.setState({lastName: value});
    } else if (id === "female") {
      this.setState({gender: "female"});
    } else if (id === "male") {
      this.setState({gender: "male"});
    } else if (id === "rather") {
      this.setState({gender: "rather"});
    } else if (id === "email") {
      this.setState({email: value});
    } else if (id === "password") {
      this.setState({password: value});
    } else if (id === "confirm-password") {
      this.setState({confirmPassword: value});
    } else if (id === "username") {
      this.setState({username: value});
    } else if (id === "email-or-username") {
      this.setState({emailOrUsername: value});
    }
  },

  handleRegistration: function (event) {
    event.preventDefault();
    ApiUtil.createUser(this.state);
  },

  handleSignin: function (event) {
    event.preventDefault();
  },

  getInitialState: function () {
    return ({
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: ""
    });
  },

  render: function () {
    var modalType = this.props.modalType;
    var form;

    if (modalType === "register") {
      form =
      <div>
        <div className="auth-nav group">
          <ul>
            <li><a
                  className="active"
                  onClick={this.handleClick}
                  href="#">Register</a></li>
            <li><a
                  className="inactive"
                  onClick={this.handleClick}
                  href="#">Sign In</a></li>
          </ul>
        </div>
        <form className="auth-form" onSubmit={this.handleRegistration}>
          <div className="o-auth">
            <p>We'll never post without your permission.</p>
          </div>
          <div className="name">
            <label htmlFor="first-name">First Name</label>
            <input
              onChange={this.handleChange}
              id="first-name"
              type="text"
              value={this.state.firstName}></input>
            <label htmlFor="last-name">Last Name</label>
            <input
              onChange={this.handleChange}
              id="last-name"
              type="text"
              value={this.state.lastName}></input>
          </div>
          <div className="gender">
            <input
              onChange={this.handleChange}
              checked={this.state.gender === "female"}
              id="female"
              value="f"
              name="user[gender]"
              type="radio"/><label htmlFor="female">Female</label>
            <input
              onChange={this.handleChange}
              checked={this.state.gender === "male"}
              id="male"
              value="m"
              name="user[gender]"
              type="radio"/><label htmlFor="male">Male</label>
            <input
              onChange={this.handleChange}
              checked={this.state.gender === "rather"}
              id="rather"
              value="r"
              name="user[gender]"
              type="radio"/><label htmlFor="rather">Rather not say</label>
          </div>
          <div className="credentials">
            <label htmlFor="email">Email</label>
            <input
              onChange={this.handleChange}
              id="email"
              type="text"
              value={this.state.email}></input>
            <label htmlFor="password">Password</label>
            <input
              onChange={this.handleChange}
              id="password"
              type="password"
              value={this.state.password}></input>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              onChange={this.handleChange}
              id="confirm-password"
              type="password"
              value={this.state.confirmPassword}></input>
            <label htmlFor="username">Username</label>
            <input
              onChange={this.handleChange}
              id="username"
              type="text"
              value={this.state.username}></input>
          </div>
          <button>Register</button>
          <p>By clicking Register, you agree to explore Covetsy. You may change your preferences in your account settings.</p>
        </form>
      </div>;
    } else {
      form =
      <div>
        <div className="auth-nav group">
          <ul>
            <li><a
                  className="inactive"
                  onClick={this.handleClick}
                  href="#">Register</a></li>
            <li><a
                  className="active"
                  onClick={this.handleClick}
                  href="#">Sign In</a></li>
          </ul>
        </div>
        <form className="auth-form" onSubmit={this.handleSignin}>
          <div className="o-auth">
          </div>
          <div className="credentials">
            <label htmlFor="email-or-username">Email or Username</label>
            <input
              onChange={this.handleChange}
              id="email-or-username"
              type="text"
              value={this.state.emailOrUsername}></input>
            <label htmlFor="last-name">Password</label>
            <input
              onChange={this.handleChange}
              id="password"
              type="password"
              value={this.state.password}></input>
          </div>
          <button>Sign In</button>
        </form>
      </div>;
    }

    return (
    <div className="overlay" onClick={this.handleClick}>
      <div className="auth-modal">
        {form}
      </div>
    </div>
    );
  }
});

module.exports = AuthForm;
