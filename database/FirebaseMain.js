import firebase from 'react-native-firebase'; 

const FirebaseMain = {
  init() {
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
  },

  getMessageRef(user) {
    return firebase.database().ref(user + '/messages');
  },

  getLocationRef(user) {
    return firebase.database().ref(user + '/location');
  },
  
  getGoalsRef() {
    return firebase.database().ref('Goals');
  },

  getGoalRef(goal) {
    return firebase.database().ref('Goals/' + goal);
  },

  getGoalStatusRef(goal) {
    return firebase.database().ref('Goals/' + goal +'/status');
  },

  getCurrentGoalRef() {
    return firebase.database().ref('CurrentGoal');
  },

  addMessage(user, message) {
    FirebaseMain.getMessageRef(user).push(message);
  },

  addLocation(user, location) {
    FirebaseMain.getLocationRef(user).push(location);
  },

  setLocation(user, location) {
    FirebaseMain.getLocationRef(user).set(location);
  },

  setGoalStatus(goalName, status) {
    FirebaseMain.getGoalStatusRef(goalName).set(status)
  },
  
  setCurrentGoal(goal) {
    FirebaseMain.getCurrentGoalRef().set(goal);
  }
}

export default FirebaseMain;