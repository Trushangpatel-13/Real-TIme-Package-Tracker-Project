import React from 'react';
import database from '@react-native-firebase/database';
import QRCodeScanner from 'react-native-qrcode-scanner';
import auth from '@react-native-firebase/auth';
import {Text,TouchableOpacity,View, Dimensions,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import Init from './Init';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class Scanner extends React.Component{
  
  constructor(props){
    super(props)
      this.state = {
        delay:10,
        result:'',
        msg:{},
        msg1:{},
        flag:0,
        email:''
      }
    
  }
  componentDidMount(){
    
    
    auth().onAuthStateChanged(user => {
        if(user){
         this.setState({
           email:user.email
        })
      }
      
      
      console.log(this.state.email) 
      database()
      .ref('/Drivers/')
      .child(this.state.email.split('@')[0])
      .once('value')
      .then(snapshot => {
      const data = snapshot.val()
          this.setState({
          msg1: data,
          });
    });    
  });
  
}

  ifScaned = e=>{
      this.setState({
        result : e.data,
        })
    
    database()
    .ref('/Packages/')
    .child(this.state.result)
    .once('value')
      .then(snapshot => {
        const data = snapshot.val()
            this.setState({
            msg: data,
            });
        
        });
        console.log(this.state.msg.Customer);
}
update = () => {

  database()
  .ref('/Packages/'+this.state.result+'/')
  .update({
      Transporter:this.state.msg1.Name,
      TWID:this.state.msg1.TWID
  })

  
  console.log(this.state.msg1.Name)
  console.log(this.state.msg1.TWID)

  /*
  if (hasLocationPermission) {
    Geolocation.getCurrentPosition(
        (position) => {
          //console.log(position.coords);
          var data = JSON.parse(position);
          console.log(data[coords]);
          
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000 }
    );
  }*/
  Geolocation.getCurrentPosition(data =>
  database()
  .ref('/Location/'+this.state.email.split('@')[0]+'/')
  .update({
      Lat:data.coords.latitude,
      Long:data.coords.longitude,
      Timestamp:data.timestamp
  })
  )
    
  } 
  render(){
    
    return(
        <View>
    <View style={{flex:0.5}}>
      <QRCodeScanner
      containerStyle = {{backgroundColor:'#FFF'}}
      onRead = {this.ifScaned}
      reactivate = {true}
      permissionDialogMessage = "Need Permission"
      reactivateTimeout = {1000}
      showMarker = {true}
      markerStyle={{borderColor:"#FFF",borderRadius:10}}
      
      />
      
      </View>
      <View style={{marginTop:windowHeight*0.61,marginHorizontal:windowWidth*0.05}}>
      <Text style={{fontSize:21,color:'#006699'}}>Name : <Text style={{color:'#0066ff'}}>{this.state.msg.Customer}</Text></Text>
      <Text style={{fontSize:21,color:'#006699'}}>Category : <Text style={{color:'#0066ff'}}>{this.state.msg.Category}</Text></Text>
      <Text style={{fontSize:21,color:'#006699'}}>Destination : <Text style={{color:'#0066ff'}}>{this.state.msg.Dest}</Text></Text>
      
      <Text style={{fontSize:21,color:'#006699',marginTop:15}}>New Transporter: <Text style={{color:'#0066ff'}}>{this.state.msg.Transporter}</Text></Text>
      <Text style={{fontSize:21,color:'#006699',marginTop:8}}>New Truck/Warehouse ID: <Text style={{color:'#0066ff'}}>{this.state.msg.TWID}</Text></Text>
      
      <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={this.update()}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>BACK</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
      </View>
      </View>
    )
    
      
    
  }
}

const styles = StyleSheet.create({
    
    
    
    
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