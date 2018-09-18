import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Animated, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Geolocation from '../geolocation/Geolocation.js';
import FirebaseMain from '../database/FirebaseMain.js';
import Chat from './Chat.js';
import SideSelector from './SideSelector.js';
import ClueButton from './ClueButton';
import HeaderBar from './HeaderBar.js';
import BurgerModal from './BurgerModal.js';
import BJJModal from './BJJModal.js';
import CodeModal from './CodeModal.js';

export default class ScavengerMain extends Component {

  constructor(props) {
    super(props);

    FirebaseMain.init();
    this.geolocator = new Geolocation('Alexa');
    this.goals = [];
    this.state = {
      currentGoal: {
        code: 'na',
      },
      blurAnim: new Animated.Value(2),
      selectedIndex: 0,
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
    }
    FirebaseMain.getGoalsRef().once('value').then((goals) => this.setGoals(goals.val()));
    FirebaseMain.getCurrentGoalRef().once('value').then((goal) => this.setCurrentGoal(goal.val()));
  }

  componentWillUnmount() {
    FirebaseMain.getCurrentGoalRef().off('value');
    this.geolocator.clearWatch();
  }

  setGoals(goals) {
    this.goals = Object.keys(goals).map((key) => {
      goals[key].visible = false;
      return goals[key];
    });
    this.goals.sort(this.compareGoals);
  }

  compareGoals(a, b) {
    if(a.index < b.index) {
      return -1;
    }
    else if(a.index > b.index) {
      return 1;
    }
    return 0;
  }

  setCurrentGoal(goal) {
    if(goal == null) {
      this.currentGoal = this.goals[0];
    }
    else {
      this.currentGoal = goal;
    }

    FirebaseMain.setCurrentGoal(this.currentGoal);

    if(this.currentGoal.type === "location") {
      this.geolocator.setGoal(this.currentGoal, this.onGoalCompleted);
      //this.geolocator.watchLocation();
    }
  }

  onGoalCompleted() {
    //TODO: add param to navigate call inidicating goal is complete
    //this.navigate(this.currentGoal.index);
    FirebaseMain.setGoalStatus(this.currentGoal.name, 'done');
    Animated.timing(                  // Animate over time
    this.state.blurAnim,            // The animated value to drive
    {
      toValue: 0,                   // Animate to opacity: 1 (opaque)
      duration: 5000,              // Make it take a while
      useNativeDriver: true, 
    }).start();                        // Starts the animation
    if(this.currentGoal.index < this.goals.length) {
      this.setCurrentGoal(this.goals[this.currentGoal.index + 1]);
    }
  }

  clueModal() {
    switch(this.state.currentGoal.name) {
      case "fiveguys":
        return <BurgerModal onGoalCompleted={() => this.onGoalCompleted()}
                goal={this.state.currentGoal} 
                headerText={"There's some right here!"}
                bodyText={"This video may provide a clue as to Papa's whereabouts:"}/>

      case "bjj":
        return <BJJModal onGoalCompleted={() => this.onGoalCompleted()}
                goal={this.state.currentGoal} 
                headerText={"Time to head East?"}
                bodyText={"I saw Papa doing some strange things so I recorded it. Maybe the video will help us find him:"}/>

      default:
        return <CodeModal  onGoalCompleted={() => this.onGoalCompleted()} 
                iconName={'food'} goal={this.state.currentGoal} 
                headerText={'Peach and I are hungry!'} bodyText={"Enter the code when you're done feeding us:"}/>
    }
  }

  goToGoal(index) {
    this.selectorIndex = index;
    this.setState({
      currentGoal: this.goals[index],
      blurAnim: this.goals[index].status === "done" ? 0 : 8,
      selectedIndex: index,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../images/ring.jpg')}
          style={styles.ringImage}
          resizeMode="cover"
          blurRadius={8}
        />
        <HeaderBar headerText={'Where is papa?'} leftIconName={'comment-o'} 
          leftIconPress={() => this.props.navigation.openDrawer()}
          rightIconName={'question-circle-o'} 
          rightIconPress={() => this.goToGoal(this.selectedIndex + 1) }
        />
        {this.clueModal()}
        <View/>
        <View style={styles.sidebarContainer}>
          <SideSelector selectorPress={(index) => this.goToGoal(index)} 
            selectedIndex={this.state.selectedIndex} selectorItems={this.state.selectorItems}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
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
  sidebarContainer: {
    position: 'absolute',
    top: 54,
    left: 0,
    alignItems: 'flex-end',
    width: '100%',
  },
});