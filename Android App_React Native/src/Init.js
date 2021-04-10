import React from 'react';
import {Dimensions,ImageBackground,Image,View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Platform,
  StyleSheet ,
  StatusBar,
  Alert} from 'react-native';

import database from '@react-native-firebase/database';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Scanner from './Scanner';


var hr = moment().hour()

const windowHeight = Dimensions.get('window').height;
const windowwidth = Dimensions.get('window').width;

console.log(hr)


export default class Init extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            flag:0,
            msg: {},
            flag1:0,
        }
    }
    
componentDidMount(){

    auth().onAuthStateChanged(user => {
        if(user){
         this.setState({
           email:user.email
           
         })
      }
      
      
      console.log() 
      database()
      .ref('/Drivers/')
      .child(this.state.email.split('@')[0])
      .once('value')
      .then(snapshot => {
      const data = snapshot.val()
          this.setState({
          msg: data,
          });
    });    
  });
  
  
  
}
   
  render() 
  
  { 
    console.log(this.state.flag)
    if(this.state.flag){
        return(<Scanner/>)
    }else{
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome {this.state.msg.Name} !!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: '#e6ecff'
            }]}
        >
            <Text style={[styles.text_footer, {
                color: '#0066ff'
            }]}>Category : {this.state.msg.Category}</Text>
            
            <Text style={[styles.text_footer, {
                color: '#0066ff',
                marginTop: 50
            }]}>Truck No : {this.state.msg.TWID}</Text>
            
            

            

            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                        this.setState({
                            flag:1
                        })
                    }}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Scan</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {auth()
                      .signOut()
                      .then(() => console.log('User signed out!'));}}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Log Out</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
      );
    }
  }
}



    
    
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 24
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});