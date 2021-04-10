/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 
import React, { Component } from 'react';
import Login from './src/screens/Login'; 
import Init from './src/Init'
import auth from '@react-native-firebase/auth';
export default class App extends Component{
  
  constructor(){
    super()
    this.state = {
      isReady : false,
      loggedIn: null
    }
  }
  
  componentDidMount(){

    
    auth().onAuthStateChanged(user => {
      
        
      if(user){
         this.setState({
           loggedIn:true
         })
      }
      else{
        this.setState({
          loggedIn:false
        })
      }
  });
  
  
}
  render(){
    if(this.state.loggedIn)
    { 
    return (<Init/>);
    }
    else
    {
      return(<Login/>);
    }
  }
}



