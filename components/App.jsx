import React,{ Component } from 'react';

//This is where the full app will get put together, and then be exported to client.js.

// class App extends Component{
//
//   constructor(props){
//     super(props);
//     this.state = {
//       random : 'Random'
//     }
//   };
//
// render(){
//   return(
//     <h1>{this.state.random}</h1>
//   )
// };
//
//
// };

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


module.exports = ShoppingList;
