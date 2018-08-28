/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import Chat from './components/Chat.js';
import ScavengerMain from './components/ScavengerMain.js';
import FirebaseMain from './database/FirebaseMain.js';
import Geolocation from './geolocation/Geolocation.js';

import { DrawerNavigator, SafeAreaView  } from 'react-navigation';


type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    FirebaseMain.init();
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
	  	<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
	    	<Chat user={'Alexa'} interlocutor={'Puppy Jean'}/>
	    </SafeAreaView>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
