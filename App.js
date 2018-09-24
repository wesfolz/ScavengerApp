import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { DrawerNavigator, SafeAreaView } from 'react-navigation';

import Chat from './components/Chat.js';
import ScavengerMain from './components/ScavengerMain.js';
import DogClueScreen from './components/DogClueScreen.js';
import TravelClueScreen from './components/TravelClueScreen.js';
import FirebaseMain from './database/FirebaseMain.js';
import HeaderBar from './components/HeaderBar.js';
import SideSelector from './components/SideSelector.js';
import NavigationService from './NavigationService.js';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  navigate(index) {
    NavigationService.navigate(this.routes[index]);
    this.setState({selectedIndex: index});
  }

  render() {
    return (
      <View style={styles.container}>
        <DrawerComponent 
          ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef)}}
        />
      </View>
    );
  }
}

const DrawerComponent = DrawerNavigator({
  Home: {
    screen: ScavengerMain,
  },
  First: {
    screen: DogClueScreen,
  },
  Second: {
    screen: TravelClueScreen,
  },
  Chat: {
    screen: Chat,
  }
}, 
{
  drawerPosition: 'left',
  contentComponent: (props) => (
	  	<SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
	    	<Chat user={'Alexa'} interlocutor={'Peach'} onReceiveMethod={() => NavigationService.openDrawer()}/>
	    </SafeAreaView>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});