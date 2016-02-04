var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    browserHistory = require('react-router').browserHistory,
    App = require('./components/app'),
    Homepage = require('./components/homepage'),
    Profile = require('./components/profile'),
    Sell = require('./components/sell'),
    Onboarding = require('./components/onboarding');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Homepage}/>
    <Route path="people/:username" component={Profile}/>
    <Route path="sell" component={Sell}/>
    <Route path="onboarding" component={Onboarding}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={browserHistory}>{routes}</Router>,
    document.getElementById('root')
  );
});
