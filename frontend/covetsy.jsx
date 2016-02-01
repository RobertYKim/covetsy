var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    App = require('./components/app'),
    Homepage = require('./components/homepage'),
    AuthForm = require('./components/auth_form');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Homepage}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('root')
  );
});
