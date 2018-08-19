import FirebaseMain from '../database/FirebaseMain.js'

export default class Geolocation {
  constructor(user, fire) {
    this.user = user;
    this.fire = fire;
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.fire.addLocation(this.user, position),
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  watchLocation() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.fire.addLocation(this.user, position),
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 100 },
    );
  }
}