import firebase from "firebase";
import "firebase/firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCuoivc0F2EjojrKO4wK3aDk9tVeKQ_qk0",
  authDomain: "tsubagram.firebaseapp.com",
  databaseURL: "https://tsubagram.firebaseio.com",
  projectId: "tsubagram",
  storageBucket: "tsubagram.appspot.com",
  messagingSenderId: "158113687012",
  appId: "1:158113687012:web:9b68ecb1b075ec7a6ad3f1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
