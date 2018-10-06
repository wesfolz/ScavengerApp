import firebase from 'react-native-firebase'; 

const init = () => {
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
};

const Messaging = {
  requestMessagingPermission() {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (!enabled) {
          // user does not have permissions
          alert('need to ask for permissions');
          firebase.messaging().requestPermission()
            .then(() => {
              // User has authorized  
            })
            .catch(error => {
              // User has rejected permissions  
            });
        } else {
        }
      });

      // Build a channel
      const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');

      // Create the channel
      firebase.notifications().android.createChannel(channel);
  },

  sendLocalNotification(title, body) {
    const notification = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle(title)
      .setBody(body)
      .android.setChannelId('test-channel')
      .android.setSmallIcon('ic_launcher');
    
    firebase.notifications().displayNotification(notification);
  },

};

const Database = {

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
    Database.getMessageRef(user).push(message);
  },

  addLocation(user, location) {
    Database.getLocationRef(user).push(location);
  },

  setLocation(user, location) {
    Database.getLocationRef(user).set(location);
  },

  setGoalStatus(goalName, status) {
    Database.getGoalStatusRef(goalName).set(status)
  },
  
  setCurrentGoal(goal) {
    Database.getCurrentGoalRef().set(goal);
  }
};

init();
Messaging.requestMessagingPermission();

export {
  Database,
  Messaging
};