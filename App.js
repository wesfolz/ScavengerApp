import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import { DrawerNavigator, SafeAreaView } from 'react-navigation';

import Chat from './components/Chat.js';
import ScavengerMain from './components/ScavengerMain.js';
import FirebaseMain from './database/FirebaseMain.js';
import Geolocation from './geolocation/Geolocation.js';
import HeaderBar from './components/HeaderBar.js';
import NavigationService from './NavigationService.js';

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    FirebaseMain.init();
    this.geolocator = new Geolocation('Alexa');
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderBar headerText={'Header Text'} leftIconName={'message-text'} leftIconPress={() => NavigationService.openDrawer()}
            rightIconName={'emoticon-poop'}
        />
        <DrawerComponent 
          ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);}}
        />
      </View>
    );
  }
}

const DrawerComponent = DrawerNavigator({
  Main: {
      screen: ScavengerMain,
  },
  Chat: {
    screen: Chat,
  }
}, 
{
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