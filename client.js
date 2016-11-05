import React from 'react';
import ReactDOM from 'react-dom';
import {MyInput, valueInputed, myNotes} from './components/CustomForm.jsx';
import App from './components/App.jsx';
//import Routes from './components/Routes/routes.jsx';
import { Router, Route, Link, browserHistory, Redirect } from 'react-router';
import { routes } from './client/routes';

class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}


ReactDOM.render(routes,document);





//Example Given Via Website.

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { browserHistory } from 'react-router';
//
// import Routes from './routes';
//
// import './index.css';
//
// ReactDOM.render(
//   <Routes history={browserHistory} />,
//   document.getElementById('root')
// );
