import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import FirebaseMain from '../database/FirebaseMain.js';
import CodeModal from './CodeModal.js';

export default class DogClueScreen extends Component {

  constructor() {
    super();
    this.state = {
      dogFoodGoal: {
        code: 'na'
      },
      dogPoopGoal: {
        code: 'na'
      },
    };
  }

  componentDidMount() {
    FirebaseMain.getGoalRef('dogfood').on('value', (goal) => this.updateFirstGoal(goal));
    FirebaseMain.getGoalRef('dogpoop').on('value', (goal) => this.updateLastGoal(goal));
  }

  componentWillUnmount() {
    FirebaseMain.getGoalRef('dogfood').off('value');
    FirebaseMain.getGoalRef('dogpoop').off('value');
  }

  updateFirstGoal(goal) {
    if(goal.val().status === 'done' && this.state.dogPoopGoal.status === 'locked') {
      FirebaseMain.setGoalStatus('dogpoop', 'unlocked');      
    }

    this.setState({
        dogFoodGoal: goal.val(),
    });
  }

  updateLastGoal(goal) {
    this.setState({
        dogPoopGoal: goal.val(),
    });
    if(goal.val().status === 'done') {
      this.props.navigation.navigate('Second');
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
            source={require('../images/ring_0.png')}
            style={styles.ringImage}
            resizeMode="contain"
          />
          <CodeModal iconName={'food'} goal={this.state.dogFoodGoal} 
            headerText={'Peach and I are hungry!'} bodyText={"Enter the code when you're done feeding us:"}/>
          <CodeModal iconName={'emoticon-poop'} goal={this.state.dogPoopGoal} 
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