import React, { Component } from 'react';

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      test : 'test'
    }
  }

render(){
  return(
    <h1>Where we will login</h1>
  )
}


};


module.exports = LoginForm;
