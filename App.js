/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, WebView} from 'react-native';
import Chat from './components/Chat.js';
import ScavengerMain from './components/ScavengerMain.js';
import FirebaseMain from './database/FirebaseMain.js';
import Geolocation from './geolocation/Geolocation.js';

import { DrawerNavigator } from 'react-navigation';


type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.geolocator = new Geolocation('Alexa');
  }

  render() {
    return (
      <DrawerComponent />
    );
  }
}

const DrawerComponent = DrawerNavigator({
  Main: {
      screen: ScavengerMain,
  },
}, {
  drawerPosition: 'left',
  contentComponent: (props) => (
    <Chat user={'Alexa'} interlocutor={'Puppy Jean'}/>
  )
});
