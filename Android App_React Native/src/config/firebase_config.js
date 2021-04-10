
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
var firebaseConfig = {
  apiKey: "AIzaSyDxQyfFPYsD27uHpOPGp9FC2VxlxVSEmsA",
  authDomain: "news-471f1.firebaseapp.com",
  databaseURL: "https://news-471f1.firebaseio.com",
  projectId: "news-471f1",
  storageBucket: "news-471f1.appspot.com",
  messagingSenderId: "579352149196",
  appId: "1:579352149196:web:75c2b568d65623cdbed669",
  measurementId: "G-YT4FLNBL4N"
};
  

export default ()=>{
  return {firebase,auth}
};