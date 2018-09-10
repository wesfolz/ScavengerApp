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

  constructor() {
    super();

    this.state = {
      burgerGoal: {
        code: 'na',
      }
    }
  }
  /*
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoloactor.watchId);
  }
  */

  componentDidMount() {
    FirebaseMain.getGoalRef('fiveguys').on('value', (goal) => this.setState({burgerGoal: goal.val()}));
  }

  componentWillUnmount() {
    FirebaseMain.getGoalRef('fiveguys').off('value');
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
            source={require('../images/ring.jpg')}
            style={styles.ringImage}
            resizeMode="cover"
            blurRadius={8}
          />
          <BurgerModal goal={this.state.burgerGoal} text={"This video may provide a clue as to Papa's whereabouts:"}/>
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
    width: '100%',
    height: '100%',
  },
  ringImage: {
    position: 'absolute', //flex 1
    width: '100%', //undefined 
    height: '100%', //undefined
    top: 0, 
    left: 0, 
  }, 
});