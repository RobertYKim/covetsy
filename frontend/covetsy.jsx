var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    Header = require('./components/header.jsx'),
    AuthForm = require('./components/auth_form.jsx');

var routes = (
  <Route path="/" component={Header}>
    <Route path="join" component={AuthForm}></Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('root')
  );
});
