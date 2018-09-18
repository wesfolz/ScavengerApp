import firebase from 'react-native-firebase'; 

export default class FirebaseMain {
  static init() {
    if(!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyC02ylU8_0j3D01Y0YyYkJi5fA-q_T20iM",
        authDomain: "scavenger-5be15.firebaseapp.com",
        databaseURL: "https://scavenger-5be15.firebaseio.com",
        projectId: "scavenger-5be15",
        storageBucket: "scavenger-5be15.appspot.com",
        messagingSenderId: "75285980680"
      });
    }
  }

  static getMessageRef(user) {
    return firebase.database().ref(user + '/messages');
  }

  static getLocationRef(user) {
    return firebase.database().ref(user + '/location');
  }
  
  static getGoalsRef() {
    return firebase.database().ref('Goals');
  }

  static getGoalRef(goal) {
    return firebase.database().ref('Goals/' + goal);
  }

  static getGoalStatusRef(goal) {
    return firebase.database().ref('Goals/' + goal +'/status');
  }

  static getCurrentGoalRef() {
    return firebase.database().ref('CurrentGoal');
  }

  static addMessage(user, message) {
    FirebaseMain.getMessageRef(user).push(message);
  }

  static addLocation(user, location) {
    FirebaseMain.getLocationRef(user).push(location);
  }

  static setLocation(user, location) {
    FirebaseMain.getLocationRef(user).set(location);
  }

  static setGoalStatus(goalName, status) {
    FirebaseMain.getGoalStatusRef(goalName).set(status);
  }

  static setCurrentGoal(goal) {
    FirebaseMain.getCurrentGoalRef().set(goal);
  }
}