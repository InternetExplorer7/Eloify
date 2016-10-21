import React from 'react';
import ReactDOM from 'react-dom';

var myNotes = [];

var valueInputed;

class MyInput extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      test : 'TEST',
      typed : "",
      testArray : [],
      listColor : 'black',
      listClicked : false
    };

  };

// Showing what you typed in the input value.
  inputTyped(e){

    var typedValue = e.target.value;
    this.setState({
      typed : typedValue
    });


  };

  noteLooper(note,key){

  return(
    <li key={key} onClick={this.crossOut.bind(this)} style={{color : this.state.listColor}}>{note}</li>
  )

  };

  submitShit(e){

      e.preventDefault();

//Getting the value from the inputs.
      var input = this.refs.myInput;
      var inputValue = input.value;
      valueInputed = inputValue;

//Pushing the inputs to the array on top.
      this.state.testArray.push(inputValue);

      this.setState({
        typed : ""
      });

    console.log(myNotes);
  };

  crossOut(){
    console.log('CLICKED');
    this.setState({
      listColor : 'red',
      listClicked : true
    });
  };

  render(){
    return(
        <div>

  {/*This is the Form Right here.*/}
  <form action="" method="" onSubmit={this.submitShit.bind(this)}>

        <input type="text" ref="myInput" value={this.state.typed} onChange={this.inputTyped.bind(this)}/>

        <br/>
        <button>New {this.state.test}</button>

    </form>

    {/*All of the notes that we will loop*/}
          <ul>

            {this.state.testArray.map(this.noteLooper.bind(this))}

         </ul>

        </div>
    )
  }
};

module.exports = {
  MyInput : MyInput,
  ReactInput : valueInputed,
  myNotes : myNotes
};
