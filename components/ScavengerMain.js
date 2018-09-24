import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Animated, Image, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Geolocation from '../geolocation/Geolocation.js';
import FirebaseMain from '../database/FirebaseMain.js';
import Chat from './Chat.js';
import SideSelector from './SideSelector.js';
import ClueButton from './ClueButton';
import HeaderBar from './HeaderBar.js';
import BurgerModal from './BurgerModal.js';
import BJJModal from './BJJModal.js';
import CodeModal from './CodeModal.js';
import TheaterModal from './TheaterModal.js';

 
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
      blurAnim: new Animated.Value(1),
      selectedIndex: 0,
      selectorItems: [],
      viewRef: null,
      nextVisible: false,
      modalVisible: false,
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
      }),
      blurAnim: this.goals[this.state.selectedIndex].status === "done" ? new Animated.Value(0) : new Animated.Value(1),
      nextVisible: this.goals[this.state.selectedIndex].status === 'done',

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
      return "help-circle";
    }
    return "lock";
  }

  setCurrentGoal(goal) {
    let currentGoal = goal;
    if(goal == null) {
      currentGoal = this.goals[this.state.selectedIndex];
    }

    FirebaseMain.setCurrentGoal(currentGoal);

    //this.geolocator.clearWatch();
    if(currentGoal.type === "location") {
      this.geolocator.setGoal(currentGoal, this.onGoalCompleted);
      //this.geolocator.watchLocation();
    }
  }

  onGoalCompleted() {
    FirebaseMain.setGoalStatus(this.goals[this.state.selectedIndex].name, 'done');
    this.goals[this.state.selectedIndex].status = 'done';
    FirebaseMain.setGoalStatus(this.goals[this.state.selectedIndex + 1].name, 'unlocked');
    this.goals[this.state.selectedIndex + 1].status = 'unlocked';

    //TODO: Unhide the 'Next' button and do the following when the button is pressed
    if(this.state.selectedIndex < this.goals.length) {
      const icons = this.state.selectorItems.slice();
      icons[this.state.selectedIndex] = this.goalIconName(this.goals[this.state.selectedIndex])
      this.setCurrentGoal(this.goals[this.state.selectedIndex + 1]);
      this.setState({
        nextVisible: true,
        selectorItems: icons,
      });
    }
    this.setModalVisible(false);
    Animated.timing(                  // Animate over time
    this.state.blurAnim,            // The animated value to drive
    {
      toValue: 0,                   // Animate to opacity: 1 (opaque)
      easing: Easing.inOut(Easing.ease),
      duration: 5000,              // Make it take a while
      useNativeDriver: true, 
    }).start();                        // Starts the animation

  }

  clueModal() {
    const goal = this.goals[this.state.selectedIndex];
    if(goal != null) {
      switch(goal.name) {
        case 'fiveguys':
          return <BurgerModal  modalVisible={this.state.modalVisible} 
                  setModalVisible={(visible) => this.setModalVisible(visible)} 
                  onGoalCompleted={() => this.onGoalCompleted()} goal={goal}/>

        case 'bjj':
          return <BJJModal modalVisible={this.state.modalVisible} 
                  setModalVisible={(visible) => this.setModalVisible(visible)} 
                  onGoalCompleted={() => this.onGoalCompleted()} goal={goal}/>

        case 'theater':
          return <TheaterModal modalVisible={this.state.modalVisible} 
                  setModalVisible={(visible) => this.setModalVisible(visible)} 
                  onGoalCompleted={() => this.onGoalCompleted()} goal={goal}/>

        default:
          return <CodeModal modalVisible={this.state.modalVisible} 
                  setModalVisible={(visible) => this.setModalVisible(visible)} 
                  onGoalCompleted={() => this.onGoalCompleted} goal={goal}/>
      }
    }
    return null;
  }

  nextButton() {
    if(this.state.nextVisible) {
      return (
        <Icon.Button name={'arrow-right-thick'} color={'#F2994A'}
          backgroundColor={'#4F4F4F'} onPress={() => this.goToGoal(this.state.selectedIndex + 1)}>
          <Text style={styles.nextButton}>Next Clue</Text>
        </Icon.Button>
      );
    }
    return null;
  }

  goToGoal(index) {
    const icons = this.state.selectorItems.slice();
    icons[index] = this.goalIconName(this.goals[index])
    this.setState({
      blurAnim: this.goals[index].status === 'done' ? new Animated.Value(0) : new Animated.Value(1),
      nextVisible: this.goals[index].status === 'done',
      selectedIndex: index,
      selectorItems: icons,
    })
  }

  setModalVisible(visible) {
    if(this.goals[this.state.selectedIndex].status != 'locked') {
      this.setState({modalVisible: visible});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={this.images[this.state.selectedIndex]}
          style={styles.ringImage}
          resizeMode="contain"
        />
        <Animated.Image
          source={this.images[this.state.selectedIndex]}
          style={[styles.ringImage, {opacity: this.state.blurAnim}]}
          resizeMode="cover"
          blurRadius={2}
        />
        <HeaderBar headerText={'Where is papa?'} leftIconName={'comment-text-outline'} 
          leftIconPress={() => this.props.navigation.openDrawer()}
          rightIconName={'help-circle-outline'} 
          rightIconPress={() => this.setModalVisible(true)}
        />
        {this.clueModal()}
        <View style={styles.nextView}>
          {this.nextButton()}
        </View>
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
  nextView: {
    alignItems: 'flex-end',
    width: '100%',
    marginRight: 20,
    marginBottom: 20,
  },
  nextButton: {
    color: '#F2994A', 
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});