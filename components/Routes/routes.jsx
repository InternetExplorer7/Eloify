import React from 'react';
import { Router, Route } from 'react-router';

import App from '../App.jsx';
import Login from '../Auth/Login.jsx';
import Register from '../Auth/Register.jsx';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Register} />
  </Router>
);

//Not found Route.
//<Route path="*" component={NotFound} />

module.exports = Routes;
