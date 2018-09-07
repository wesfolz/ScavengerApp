import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Linking, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import FirebaseMain from '../database/FirebaseMain.js';
import Chat from './Chat.js';
import ClueButton from './ClueButton';
import HeaderBar from './HeaderBar.js';
import BurgerModal from './BurgerModal.js';
import CodeModal from './CodeModal.js';

export default class ScavengerMain extends Component {

  static navigationOptions = {
    drawerLabel: 'Main',
  };

  constructor() {
    super();
    this.state = {
      dogFoodGoal: {
        code: 'na'
      }
    };
  }
  /*
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoloactor.watchId);
  }
  */

  componentDidMount() {
    //FirebaseMain.getGoalRef('dogfood').once('value').then((goal) => this.setState({dogFoodGoal: goal.val()}));
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
            source={require('../images/ring_2.png')}
            style={styles.ringImage}
            resizeMode="contain"
          />
          <BurgerModal text={'I think Papa is thirsty!'}/>
          <BurgerModal text={'I think Papa is hungry!'}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ringImage: {
    position: 'absolute', //flex 1
    width: '100%', //undefined 
    height: '100%', //undefined
    top: 0, 
    left: 0, 
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    height: 100,
    width: 200
  }  
});