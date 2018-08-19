import firebase from 'react-native-firebase'; 

export default class FirebaseMain {
  constructor(receiveMessageCallback) {
    this.init();
  }
  // 2.
  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyC02ylU8_0j3D01Y0YyYkJi5fA-q_T20iM",
      authDomain: "scavenger-5be15.firebaseapp.com",
      databaseURL: "https://scavenger-5be15.firebaseio.com",
      projectId: "scavenger-5be15",
      storageBucket: "scavenger-5be15.appspot.com",
      messagingSenderId: "75285980680"
    });

  getMessageRef(user) {
    return firebase.database().ref(user + '/messages');
  }

  getLocationRef(user) {
    return firebase.database().ref(user + '/locations');
  }

  addMessage(user, message) {
    this.getMessageRef(user).push(message);
  }

  addLocation(user, location) {
    this.getLocationRef(user).push(location);
  }


}