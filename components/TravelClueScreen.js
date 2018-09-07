import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import FirebaseMain from '../database/FirebaseMain.js';
import CodeModal from './CodeModal.js';

export default class DogClueScreen extends Component {

  constructor() {
    super();
    this.state = {
      carGoal: {
        code: 'na'
      },
      bjjGoal: {
        code: 'na'
      },
    };
  }

  componentDidMount() {
    FirebaseMain.getGoalRef('car').on('value', (goal) => this.updateFirstGoal(goal));
    FirebaseMain.getGoalRef('bjj').on('value', (goal) => this.updateLastGoal(goal));
  }

  componentWillUnmount() {
    FirebaseMain.getGoalRef('car').off('value');
    FirebaseMain.getGoalRef('bjj').off('value');
  }

  updateFirstGoal(goal) {
    if(goal.val().status === 'done' && this.state.bjjGoal.status === 'locked') {
      FirebaseMain.setGoalStatus('bjj', 'unlocked');      
    }

    this.setState({
        carGoal: goal.val(),
    });
  }

  updateLastGoal(goal) {
    this.setState({
        bjjGoal: goal.val(),
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
            source={require('../images/ring_1.png')}
            style={styles.ringImage}
            resizeMode="contain"
          />
          <CodeModal iconName={'car'} goal={this.state.carGoal} 
            headerText={'Maybe Papa left the house?'} bodyText={"Enter the code:"}/>
          <CodeModal iconName={'emoticon-poop'} goal={this.state.bjjGoal} 
            headerText={'Peach and I have to poop!'} bodyText={"Enter the code when we're done pooping:"}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
});