var React = require('react');
var ReactRouter = require('react-router');

var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var App = require('../components/App.jsx');
var LoginForm = require('../components/Auth/Login.jsx');
var RegisterForm = require('../components/Auth/Register.jsx');
var CustomMap1 = require('../components/Map1.jsx');
var CustomMap2 = require('../components/Map2.jsx');

var IsoTest = require('../components/Test.jsx');

var AnotherPage = React.createClass({

  render: function() {

    return (<div>This is Another Page</div>)

  }

});


// var CustomButton = React.createClass({
//   render : function(){
//     return(
//       <FlatButton label="Test"/>
//     )
//   }
// });


//A function I made to bring in Routes.
function addRoute(route){
  console.log(route);
}


//Removed the <Router> key. Remember to add that shit later.
var routes = (
<Router history={browserHistory}>

      <Route path="/mapgame" component={CustomMap2}/>

      <Route path="/react-login" component={IsoTest}/>

      <Route path="/react-register" component={RegisterForm}/>

      <Route path="/mapgame2" component={CustomMap1}/>

</Router>
)



module.exports = {
  routes : routes
}
