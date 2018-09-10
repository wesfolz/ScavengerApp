import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { DrawerNavigator, SafeAreaView } from 'react-navigation';

import Chat from './components/Chat.js';
import ScavengerMain from './components/ScavengerMain.js';
import DogClueScreen from './components/DogClueScreen.js';
import TravelClueScreen from './components/TravelClueScreen.js';
import FirebaseMain from './database/FirebaseMain.js';
import Geolocation from './geolocation/Geolocation.js';
import HeaderBar from './components/HeaderBar.js';
import SideSelector from './components/SideSelector.js';
import NavigationService from './NavigationService.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    FirebaseMain.init();
    this.geolocator = new Geolocation('Alexa');
    this.routes = ['Home', 'First', 'Second'];
    this.state = {
      selectorItems: [
          'home',
          'car',
          'question-circle',
          'lock',
          'lock',
          'lock',
          'lock',
          'lock',
          'lock',
      ],
      selectedIndex: 0,
    }
  }

  navigate(index) {
    NavigationService.navigate(this.routes[index]);
    this.setState({selectedIndex: index});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.screenContainer}>
          <DrawerComponent 
            ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);}}
          />
        </View>
        <View style={styles.headerContainer}>
          <HeaderBar headerText={'Where is papa?'} leftIconName={'comment-o'} 
            leftIconPress={() => NavigationService.openDrawer()}
            rightIconName={'question-circle-o'} 
            rightIconPress={() => this.navigate(this.state.selectedIndex + 1) }
          />
          <SideSelector selectorPress={(index) => this.navigate(index)} 
            selectedIndex={this.state.selectedIndex} selectorItems={this.state.selectorItems}/>
        </View>
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
	    	<Chat user={'Alexa'} interlocutor={'Puppy Jean'}/>
	    </SafeAreaView>
  )
});

const styles = StyleSheet.create({
headerContainer: {
    //flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  screenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    //flexDirection: 'column',
    //alignItems: 'flex-end',
  },
});