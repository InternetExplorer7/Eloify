var React = require('react');
var ReactRouter = require('react-router');

var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var App = require('../components/App.jsx');
var LoginForm = require('../components/Auth/Login.jsx');
var RegisterForm = require('../components/Auth/Register.jsx');
var CustomMap = require('../components/Map.jsx');

var AnotherPage = React.createClass({

  render: function() {

    return (<div>This is Another Page</div>)

  }

});


var routes = (

  <Router history={browserHistory}>

      <Route path="/mapgame" component={CustomMap}/>

      <Route path="/react-login" component={LoginForm}/>

      <Route path="/react-register" component={RegisterForm}/>

  </Router>

)

module.exports = {
  routes: routes
}
