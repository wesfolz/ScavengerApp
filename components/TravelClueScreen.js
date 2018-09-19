import React, {Component} from 'react';
import {StyleSheet, View, Image, Animated} from 'react-native';

import FirebaseMain from '../database/FirebaseMain.js';
import CodeModal from './CodeModal.js';
import BJJModal from './BJJModal.js';

export default class TravelClueScreen extends Component {

  constructor() {
    super();
    this.state = {
      carGoal: {
        code: 'na'
      },
      bjjGoal: {
        code: 'na'
      },
      blurAnim: new Animated.Value(2),
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
    if(goal.val().status === 'done' && this.state.bjjGoal.status != 'done') {
      FirebaseMain.setGoalStatus('bjj', 'unlocked');
      Animated.timing(                  // Animate over time
      this.state.blurAnim,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 1 (opaque)
        duration: 5000,              // Make it take a while
        useNativeDriver: true, 
      }).start();                        // Starts the animation
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
    //let blurAnim = this.state.blurAnim;
    return (
      <View style={styles.container}>
          <Animated.Image
            source={require('../images/ring_1.png')}
            style={styles.ringImage}
            resizeMode="cover"
            blurRadius={this.state.blurAnim}
          />

          {/*<CodeModal iconName={'car'} goal={this.state.carGoal} 
            headerText={'Maybe Papa left the house?'} bodyText={"Enter the code:"}/>*/}
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