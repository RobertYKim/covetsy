var React = require('react'),
    AuthFormActions = require('../actions/auth_form_actions'),
    UsersApiUtil = require('../util/users_api_util'),
    SessionsApiUtil = require('../util/sessions_api_util');

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
    var nonword = /\W/;
    if (id === "first-name") {
      this.setState({first_name: value});
    } else if (id === "last-name") {
      this.setState({last_name: value});
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
      this.setState({confirm_password: value});
    } else if (id === "username") {
      var oldState = this.state.username;
      if (nonword.test(value)) {
        this.setState({username: oldState});
      } else {
        this.setState({username: value});
      }
    } else if (id === "email-or-username") {
      this.setState({email_or_username: value});
    } else if (id === "signin-password") {
      this.setState({signin_password: value});
    }
  },

  handleRegistration: function (event) {
    event.preventDefault();
    UsersApiUtil.createUser(this.state);
  },

  handleSignin: function (event) {
    event.preventDefault();
    SessionsApiUtil.signin(this.state);
  },

  getInitialState: function () {
    return ({
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      password: "",
      confirm_password: "",
      username: "",
      email_or_username: "",
      signin_password: ""
    });
  },

  render: function () {
    var modalType = this.props.modalType;

    var registerTabStatus,
        signinTabStatus;
    if (modalType === "register") {
      registerTabStatus = "active";
      signinTabStatus = "inactive";
    } else {
      registerTabStatus = "inactive";
      signinTabStatus = "active";
    }

    var authNavTabs;
    authNavTabs =
      <div className="auth-nav group">
        <ul>
          <li><a
                className={registerTabStatus}
                onClick={this.handleClick}
                href="#">Register</a></li>
          <li><a
                className={signinTabStatus}
                onClick={this.handleClick}
                href="#">Sign In</a></li>
        </ul>
      </div>;

    var oAuth,
        oAuthDisclaimer;
    if (modalType === "register") {
      oAuthDisclaimer = <p>We'll never post without your permission.</p>;
    }
    oAuth =
      <div className="o-auth">
        {oAuthDisclaimer}
      </div>;

    var firstNameInput;
    firstNameInput =
      <div className="first-name-input">
        <label htmlFor="first-name">First Name</label>
        <input
          onChange={this.handleChange}
          id="first-name"
          type="text"
          value={this.state.first_name}></input>
      </div>;

    var lastNameInput;
    lastNameInput =
      <div className="last-name-input">
        <label htmlFor="last-name">Last Name</label>
        <input
          onChange={this.handleChange}
          id="last-name"
          type="text"
          value={this.state.last_name}></input>
      </div>;

    var genderInput;
    genderInput =
      <div className="gender">
        <input
          onChange={this.handleChange}
          checked={this.state.gender === "female"}
          id="female"
          value="f"
          name="user-gender"
          type="radio"/><label htmlFor="female">Female</label>
        <input
          onChange={this.handleChange}
          checked={this.state.gender === "male"}
          id="male"
          value="m"
          name="user-gender"
          type="radio"/><label htmlFor="male">Male</label>
        <input
          onChange={this.handleChange}
          checked={this.state.gender === "rather"}
          id="rather"
          value="r"
          name="user-gender"
          type="radio"/><label htmlFor="rather">Rather not say</label>
      </div>;

    var emailInput;
    emailInput =
      <div className="email-input">
        <label htmlFor="email">Email</label>
        <input
          onChange={this.handleChange}
          id="email"
          type="text"
          value={this.state.email}></input>
      </div>;

    var passwordInput;
    passwordInput =
      <div className="password-input">
        <label htmlFor="password">Password</label>
        <input
          onChange={this.handleChange}
          id="password"
          type="password"
          value={this.state.password}></input>
      </div>;

    var confirmPasswordInput;
    confirmPasswordInput =
      <div className="confirm-password-input">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          onChange={this.handleChange}
          id="confirm-password"
          type="password"
          value={this.state.confirm_password}></input>
      </div>;

    var usernameInput;
    usernameInput =
      <div className="username-input">
        <label htmlFor="username">Username</label>
        <input
          onChange={this.handleChange}
          id="username"
          type="text"
          value={this.state.username}></input>
      </div>;

    var submitButton;
    if (modalType === "register") {
      submitButton = <button>Register</button>;
    } else {
      submitButton = <button>Sign In</button>;
    }

    var registrationDisclaimer;
    registrationDisclaimer =
      <p>
        By clicking Register, you agree to explore Covetsy.
        You may change your preferences in your account settings.
      </p>;

    var emailOrUsernameInput;
    emailOrUsernameInput =
      <div className="email-or-username-input">
        <label htmlFor="email-or-username">Email or Username</label>
        <input
          onChange={this.handleChange}
          id="email-or-username"
          type="text"
          value={this.state.email_or_username}></input>
      </div>;

    var signinPasswordInput;
    signinPasswordInput =
      <div className="signin-password-input">
        <label htmlFor="signin-password">Password</label>
        <input
          onChange={this.handleChange}
          id="signin-password"
          type="password"
          value={this.state.signin_password}></input>
      </div>;

    var form;
    if (modalType === "register") {
      form =
        <div>
          {oAuth}
          {firstNameInput}
          {lastNameInput}
          {genderInput}
          {emailInput}
          {passwordInput}
          {confirmPasswordInput}
          {usernameInput}
          {submitButton}
          {registrationDisclaimer}
        </div>;
    } else {
      form =
        <div>
          {oAuth}
          {emailOrUsernameInput}
          {signinPasswordInput}
          {submitButton}
        </div>;
    }

    return (
    <div className="overlay" onClick={this.handleClick}>
      <div className="auth-modal">
        {authNavTabs}
        <form className="auth-form" onSubmit={this.handleRegistration}>
          {form}
        </form>
      </div>
    </div>
    );
  }
});

module.exports = AuthForm;
