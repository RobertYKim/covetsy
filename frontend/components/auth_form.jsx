var React = require('react');

var AuthForm = React.createClass({
  render: function () {
    var modalType = this.props.modalType;
    var form;

    if (modalType === "register") {

    } else {

    }

    return (
      <div className="auth-modal">
        {modalType}
      </div>
    );
  }
});

module.exports = AuthForm;
