import React from 'react';
import ReactDOM from 'react-dom';
import {MyInput, valueInputed, myNotes} from './components/CustomForm.jsx';

// var Hello = React.createClass({
//   render : function(){
//     return(
//       <div>
//         Hello REACT!!!
//       </div>
//     );
//   }
// });
var testArray = ['Hello', 'Bye', 'Eat A Dick'];

class Hello extends React.Component{

constructor(props){
  super(props);

  this.state = {
    people : 'Hello',
  };

};



render(){
    return(
      <div>
        <h3>How are you {this.state.people}?</h3>

{/*The main input that we will use.*/}
        <MyInput/>



      </div>
    )
  }
};

class Hi extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      name : 'Martha'

      };
  }

  render(){
    return(
      <div>

        <h1>
          Hey ES6 WHATTUP {this.state.name}!!!
          {this.state.propshit}
        </h1>

      </div>
    )
  }
}

ReactDOM.render(<Hello name="Farhan"/>,document.getElementById('app'));
