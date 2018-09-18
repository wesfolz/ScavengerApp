import FirebaseMain from '../database/FirebaseMain.js';

export default class Geolocation {
  constructor(user) {
    this.distanceFilter = 100;
    this.user = user;
    this.goal = null;
    this.goalCallback = null;
    this.getLocation();
  }

  setGoal(goal, goalCallback) {
    this.goal = goal;
    this.goalCallback = goalCallback;
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => FirebaseMain.setLocation(this.user, position),
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  watchLocation() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.updateLocation(position),
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: this.distanceFilter },
    );
  }

  clearWatch() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  updateLocation(position) {
    if(this.goal != null) {
      var distance = this.getDistanceFromLatLonInM(position.coords.latitude, position.coords.longitude, 
        this.goal.coords.latitude, this.goal.coords.longitude);

      if(distance <= this.distanceFilter) {
        //update goal status in database
        this.goalCallback();
        this.goal = null;
      }
    }
    FirebaseMain.setLocation(this.user, position);
  }

  getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(lat1)) 
      * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = (R * c)/1000; // Distance in m
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180);
  }
}