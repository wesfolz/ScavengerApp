import firebase from 'react-native-firebase'; 

export default class FirebaseMain {
  // 2.
  static init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyC02ylU8_0j3D01Y0YyYkJi5fA-q_T20iM",
      authDomain: "scavenger-5be15.firebaseapp.com",
      databaseURL: "https://scavenger-5be15.firebaseio.com",
      projectId: "scavenger-5be15",
      storageBucket: "scavenger-5be15.appspot.com",
      messagingSenderId: "75285980680"
    });

  static getMessageRef(user) {
    return firebase.database().ref(user + '/messages');
  }

  static getLocationRef(user) {
    return firebase.database().ref(user + '/locations');
  }

  static addMessage(user, message) {
    this.getMessageRef(user).push(message);
  }

  static addLocation(user, location) {
    this.getLocationRef(user).push(location);
  }


}