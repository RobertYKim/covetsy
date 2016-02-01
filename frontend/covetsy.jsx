var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    App = require('./components/app'),
    Homepage = require('./components/homepage'),
    Profile = require('./components/profile'),
    AuthForm = require('./components/auth_form');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Homepage}/>
    <Route path="people/:username" component={Profile}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('root')
  );
});
