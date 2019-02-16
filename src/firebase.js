import firebase from 'firebase';


  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCWx98KKl6FBteOvpW2q5DLLbaLvpIZ7O4",
    authDomain: "guitarfrets-36a4b.firebaseapp.com",
    databaseURL: "https://guitarfrets-36a4b.firebaseio.com",
    projectId: "guitarfrets-36a4b",
    storageBucket: "guitarfrets-36a4b.appspot.com",
    messagingSenderId: "426243532021"
  };
  firebase.initializeApp(config);
  export default firebase;