var React = require('react'),
    AuthFormActions = require('../actions/auth_form_actions'),
    UsersApiUtil = require('../util/users_api_util'),
    SessionsApiUtil = require('../util/sessions_api_util');

var AuthForm = React.createClass({
  handleClick: function (event) {
    event.stopPropagation();
    this.resetFocus();
    if (event.target.className === "overlay") {
      event.preventDefault();
      AuthFormActions.hideAuthForm();
    } else if (event.target.text === "Register") {
      event.preventDefault();
      AuthFormActions.showAuthForm("register");
    } else if (event.target.text === "Sign In") {
      event.preventDefault();
      AuthFormActions.showAuthForm("signin");
    } else if (
        event.target.id === "email" ||
        event.target.htmlFor === "email") {
      this.setState({clickedEmail: true});
    } else if (
        !this.state.clickedUsername &&
        event.target.id === "username" ||
        event.target.htmlFor === "username") {
      this.setState({
        clickedUsername: true,
        unfocusedUsername: false
      });
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
      this.validateEmail(value);
      this.setState({
        email: value,
        unfocusedEmail: false
      });
    } else if (id === "password") {
      this.validatePassword(value);
      this.setState({
        password: value,
        unfocusedPassword: false
      });
    } else if (id === "confirm-password") {
      this.validateConfirmPassword(value);
      this.setState({
        confirm_password: value,
        unfocusedConfirmPassword: false
      });
    } else if (id === "username") {
      var oldState = this.state.username;
      if (nonword.test(value)) {
        this.validateUsername(oldState);
        this.setState({
          username: oldState,
          unfocusedUsername: false
        });
      } else {
        this.validateUsername(value);
        this.setState({
          username: value,
          unfocusedUsername: false
        });
      }
    } else if (id === "email-or-username") {
      this.setState({email_or_username: value});
    } else if (id === "signin-password") {
      this.setState({signin_password: value});
    }
  },

  resetFocus: function () {
    this.setState({
      unfocusedEmail: true,
      unfocusedPassword: true,
      unfocusedConfirmPassword: true,
      unfocusedUsername: true
    });
  },

  validateEmail: function (value) {
    var at = /\w@\w/;
    var dot = /\w\.\w/;
    if (at.test(value) && dot.test(value)) {
      this.setState({invalidEmail: false});
    } else {
      this.setState({invalidEmail: true});
    }
  },

  validatePassword: function (value) {
    if (value.length >= 6) {
      this.setState({invalidPassword: false});
    } else {
      this.setState({invalidPassword: true});
    }
  },

  validateConfirmPassword: function (value) {
    if (value === this.state.password) {
      this.setState({invalidConfirmPassword: false});
    } else {
      this.setState({invalidConfirmPassword: true});
    }
  },

  validateUsername: function (value) {
    if (value === "") {
      this.setState({invalidUsername: true});
    } else {
      this.setState({invalidUsername: false});
    }
  },

  validRegistration: function () {
    if (
      this.state.invalidEmail ||
      this.state.invalidPassword ||
      this.state.invalidConfirmPassword ||
      this.state.invalidUsername) {
        return false;
    } else {
      return true;
    }
  },

  handleRegistration: function (event) {
    event.preventDefault();
    if (this.validRegistration()) {
      AuthFormActions.hideAuthForm();
      UsersApiUtil.createUser(this.state);
    }
  },

  handleSignin: function (event) {
    event.preventDefault();
    AuthFormActions.hideAuthForm();
    SessionsApiUtil.signin(this.state);
  },

  handleFacebook: function (event) {
    event.preventDefault();
    var state;
    if (window.localStorage.cartListings) {
      state = JSON.parse(window.localStorage.cartListings);
    }
    var url = '/auth/facebook';
    window.history.pushState(state, "", url);
  },

  getInitialState: function () {
    var cartListings = "";
    if (window.localStorage.cartListings) {
      cartListings = window.localStorage.cartListings;
    }
    return ({
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      password: "",
      confirm_password: "",
      username: "",
      email_or_username: "",
      signin_password: "",
      invalidEmail: true,
      invalidPassword: true,
      invalidConfirmPassword: true,
      invalidUsername: true,
      clickedUsername: false,
      cartListings: cartListings
    });
  },

  render: function () {
    var errors = this.props.errors;
    var emailTaken = /Email has already been taken/;
    var usernameTaken = /Username has already been taken/;
    var usernameTooShort = /Username is too short/;
    var emailError,
        usernameError,
        credentialsError;
    if (errors) {
      errors.forEach( function (error) {
        if (emailTaken.test(error[0])) {
          emailError = "Sorry, the email you have entered is already in use.";
        } else if (usernameTaken.test(error[0])) {
          usernameError = "Sorry, that username is taken.";
        } else if (usernameTooShort.test(error[0])) {
          usernameError = "Must be at least 4 characters.";
        } else {
          credentialsError = error[0];
        }
      });
    }

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
        oAuthButtons,
        oAuthDisclaimer;
    if (modalType === "register") {
      oAuthButtons =
        <div>
          <a
            href="/auth/facebook"
            className="oauth-facebook">
            <span className="fa fa-facebook-official fa-lg"></span>
            Continue with Facebook
          </a>
          <a
            href="/auth/google_oauth2"
            className="oauth-google">
            <span className="fa fa-google fa-lg"></span>
            Continue with Google
          </a>
        </div>;
      oAuthDisclaimer = <p>We'll never post without your permission.</p>;
    } else {
      oAuthButtons =
        <div>
          <a
            href="/auth/facebook"
            className="oauth-facebook">
            <span className="fa fa-facebook-official fa-lg"></span>
            Sign in with Facebook
          </a>
          <a
            href="/auth/google_oauth2"
            className="oauth-google">
            <span className="fa fa-google fa-lg"></span>
            Sign in with Google
          </a>
        </div>;
    }
    oAuth =
      <div className="o-auth">
        {oAuthButtons}
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
        <span>Names on covEtsy are public, but optional.</span>
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

    var emailInput,
        emailInputNote;
    if (
      this.state.email !== "" &&
      this.state.clickedEmail &&
      this.state.unfocusedEmail &&
      this.state.invalidEmail) {
        emailInputNote = <span>Please enter a valid email address.</span>;
    } else if (emailError) {
      emailInputNote = <span>{emailError}</span>;
    }
    emailInput =
      <div className="email-input">
        <label htmlFor="email">Email</label>
        <input
          onChange={this.handleChange}
          id="email"
          type="text"
          value={this.state.email}></input>
        {emailInputNote}
      </div>;

    var passwordInput,
        passwordInputNote;
    if (
      this.state.password !== "" &&
      this.state.password.length < 6 &&
      this.state.unfocusedPassword) {
        passwordInputNote = <span>Must be at least 6 characters.</span>;
    }
    passwordInput =
      <div className="password-input">
        <label htmlFor="password">Password</label>
        <input
          onChange={this.handleChange}
          id="password"
          type="password"
          value={this.state.password}></input>
        {passwordInputNote}
      </div>;

    var confirmPasswordInput,
        confirmPasswordInputNote;
    if (
      this.state.confirm_password !== "" &&
      this.state.confirm_password !== this.state.password &&
      this.state.unfocusedConfirmPassword) {
        confirmPasswordInputNote = <span>Passwords must match.</span>;
    }
    confirmPasswordInput =
      <div className="confirm-password-input">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          onChange={this.handleChange}
          id="confirm-password"
          type="password"
          value={this.state.confirm_password}></input>
        {confirmPasswordInputNote}
      </div>;

    var usernameInput,
        usernameInputNote;
    if (
      this.state.clickedUsername &&
      this.state.username === "" &&
      this.state.unfocusedUsername) {
        usernameInputNote = <span>Can't be blank.</span>;
    } else if (usernameError) {
      usernameInputNote = <span>{usernameError}</span>;
    }
    usernameInput =
      <div className="username-input">
        <label htmlFor="username">Username</label>
        <input
          onChange={this.handleChange}
          id="username"
          type="text"
          value={this.state.username}></input>
        {usernameInputNote}
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
        {credentialsError}
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
        <form className="auth-form" onSubmit={this.handleRegistration}>
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
        </form>;
    } else {
      form =
        <form className="auth-form" onSubmit={this.handleSignin}>
          {oAuth}
          {emailOrUsernameInput}
          {signinPasswordInput}
          {submitButton}
        </form>;
    }

    return (
    <div className="overlay" onClick={this.handleClick}>
      <div className="auth-modal">
        {authNavTabs}
        {form}
      </div>
    </div>
    );
  }
});

module.exports = AuthForm;
