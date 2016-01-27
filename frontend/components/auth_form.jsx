var React = require('react');

var AuthForm = React.createClass({
  render: function () {
    var modalType = this.props.modalType;
    var form;

    if (modalType === "register") {
      form =
      <div>
        <div className="auth-nav group">
          <ul>
            <li><a className="active" href="#">Register</a></li>
            <li><a className="inactive" href="#">Sign In</a></li>
          </ul>
        </div>
        <form className="auth-form">
          <div className="o-auth">
            <p>We'll never post without your permission.</p>
          </div>
          <div className="name">
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              name="user[first_name]"></input>
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              name="user[last_name]"></input>
          </div>
          <div className="gender">
            <input
              id="female"
              type="radio"
              name="user[gender]"
              value="f"></input>
            <label htmlFor="female">Female</label>
            <input
              id="male"
              type="radio"
              name="user[gender]"
              value="m"></input>
            <label htmlFor="male">Male</label>
            <input
              id="rather"
              type="radio"
              name="user[gender]"
              value="r"></input>
            <label htmlFor="rather">Rather not say</label>
          </div>
          <div className="credentials">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="user[email]"></input>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              name="user[password]"></input>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              id="confirm_password"
              type="text"
              name="user[confirm_password]"></input>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="user[username]"></input>
          </div>
          <button>Register</button>
          <p>By clicking Register, you agree to explore Covetsy. You may change your preferences in your account settings.</p>
        </form>
      </div>;
    } else {

    }

    return (
      <div className="auth-modal">
        {form}
      </div>
    );
  }
});

module.exports = AuthForm;
