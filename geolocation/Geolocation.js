import FirebaseMain from '../database/FirebaseMain.js'

export default class Geolocation {
  constructor(user) {
    this.user = user;
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => FirebaseMain.addLocation(this.user, position),
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  watchLocation() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => FirebaseMain.addLocation(this.user, position),
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 100 },
    );
  }
}