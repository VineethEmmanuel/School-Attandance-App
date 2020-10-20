import firebase from 'firebase';

  // Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAtGBX-a8DwlwNueTx4BVOiIPV4UMshmss",
  authDomain: "school-attandance-app.firebaseapp.com",
  databaseURL: "https://school-attandance-app.firebaseio.com",
  projectId: "school-attandance-app",
  storageBucket: "school-attandance-app.appspot.com",
  messagingSenderId: "147939539747",
  appId: "1:147939539747:web:8a6c243a2f6bc078276a96"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default firebase.database();