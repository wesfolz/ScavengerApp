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
    this.images = [
      require("../images/ring_0.png"),
      require("../images/ring_1.png"),
      require("../images/ring_2.png"),
      require("../images/ring_3.png"),
      require("../images/ring_4.png"),
      require("../images/ring_5.png"),
      require("../images/ring_6.png"),
      require("../images/ring.jpg"), 
    ];
    this.state = {
      blurAnim: new Animated.Value(8),
      selectedIndex: 0,
      selectorItems: [
        'home',
        'car',
        'lock-question',
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
    //this.geolocator.clearWatch();
  }

  setGoals(goals) {
    this.goals = Object.keys(goals).map((key) => {
      goals[key].visible = false;
      return goals[key];
    });
    this.goals.sort(this.compareGoals);
    this.setState({
      selectorItems: this.goals.map((goal) => {
        return this.goalIconName(goal);
      })
    });

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

  goalIconName(goal) {
    if(goal.status === "done") {
      return goal.iconName;
    }
    else if(goal.status === "unlocked") {
      return "lock-question";
    }
    return "lock";
  }

  setCurrentGoal(goal) {
    let currentGoal = goal;
    if(goal == null) {
      currentGoal = this.goals[this.state.selectedIndex];
    }

    FirebaseMain.setCurrentGoal(currentGoal);

    if(currentGoal.type === "location") {
      this.geolocator.setGoal(currentGoal, this.onGoalCompleted);
      //this.geolocator.watchLocation();
    }
  }

  onGoalCompleted() {
    FirebaseMain.setGoalStatus(this.goals[this.state.selectedIndex].name, 'done');
 
    Animated.timing(                  // Animate over time
    this.state.blurAnim,            // The animated value to drive
    {
      toValue: 0,                   // Animate to opacity: 1 (opaque)
      duration: 5000,              // Make it take a while
      useNativeDriver: true, 
    }).start();                        // Starts the animation

    //TODO: Unhide the 'Next' button and do the following when the button is pressed
    if(this.state.selectedIndex < this.goals.length) {
      this.setCurrentGoal(this.goals[this.state.selectedIndex + 1]);
      this.setState({
        selectedIndex: this.state.selectedIndex + 1,
      });
    }
  }

  clueModal() {
    const goal = this.goals[this.state.selectedIndex];
    if(goal != null) {
      switch(goal.name) {
        case "fiveguys":
          return <BurgerModal onGoalCompleted={() => this.onGoalCompleted()} goal={goal}/>

        case "bjj":
          return <BJJModal onGoalCompleted={() => this.onGoalCompleted()} goal={goal}/>

        default:
          return <CodeModal onGoalCompleted={() => this.onGoalCompleted()} iconName={'food'} goal={goal}/>
      }
    }
    return null;
  }

  goToGoal(index) {
    const icons = this.state.selectorItems.slice();
    icons[index] = this.goalIconName(this.goals[index])
    this.setState({
      blurAnim: this.goals[index].status === "done" ? new Animated.Value(0) : new Animated.Value(8),
      selectedIndex: index,
      selectorItems: icons,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={this.images[this.state.selectedIndex]}
          style={styles.ringImage}
          resizeMode="cover"
          blurRadius={this.state.blurAnim}
        />
        <HeaderBar headerText={'Where is papa?'} leftIconName={'comment-o'} 
          leftIconPress={() => this.props.navigation.openDrawer()}
          rightIconName={'question-circle-o'} 
          rightIconPress={() => this.goToGoal(this.state.selectedIndex + 1) }
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