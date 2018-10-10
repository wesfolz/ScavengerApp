import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Image, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Geolocation from '../geolocation/Geolocation';
import { Database, Messaging } from '../firebase/FirebaseMain';
import SideSelector from './SideSelector';
import HeaderBar from './HeaderBar';
import BurgerModal from './BurgerModal';
import BJJModal from './BJJModal';
import CodeModal from './CodeModal';
import TheaterModal from './TheaterModal';
import Colors from '../styles/Colors';
import InfoModal from './InfoModal';
import CommonStyles from '../styles/CommonStyles';

export default class ScavengerMain extends Component {

    constructor(props) {
        super(props);

        this.geolocator = new Geolocation('Alexa');
        this.images = [
            require("../images/ring.jpg"),
            require("../images/ring_0.png"),
            require("../images/ring_1.png"),
            require("../images/ring_2.png"),
            require("../images/ring_3.png"),
            require("../images/ring_4.png"),
            require("../images/ring_5.png"),
            require("../images/ring_6.png"),
        ];

        this.goals = [];
        this.currentGoal = null;
        this.state = {
            blurAnim: new Animated.Value(1),
            selectedIndex: 0,
            selectorItems: [],
            viewRef: null,
            nextVisible: false,
            modalVisible: false,
        };
        Database.getGoalsRef().once('value').then((goals) => this.setGoals(goals.val()));
        Database.getCurrentGoalRef().once('value').then((goal) => this.setInitialGoal(goal.val()));
    }

    componentWillUnmount() {
        this.geolocator.clearWatch();
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
        if (a.index < b.index) {
            return -1;
        }
        else if (a.index > b.index) {
            return 1;
        }
        return 0;
    }

    goalIconName(goal) {
        if (goal.status === "done" || goal.index === 0) {
            return goal.iconName;
        }
        else if (goal.status === "unlocked") {
            return "help-circle";
        }
        return "lock";
    }

    setInitialGoal(goal) {
        this.setCurrentGoal(goal);
        this.setState({
            selectedIndex: this.currentGoal.index
        });
    }

    setCurrentGoal(goal) {
        this.currentGoal = goal;
        if (goal == null) {
            this.currentGoal = this.goals[this.state.selectedIndex];
        }

        Database.setCurrentGoal(this.currentGoal);

        this.geolocator.clearWatch();
        if (this.currentGoal.type === "location") {
            this.geolocator.setGoal(this.currentGoal, () => this.onGoalCompleted());
            this.geolocator.watchLocation();
        }
    }

    onGoalCompleted() {
        Messaging.sendLocalNotification('Well Done!', 'Goal ' + this.currentGoal.name + ' completed!');

        Database.setGoalStatus(this.currentGoal.name, 'done');
        this.goals[this.currentGoal.index].status = 'done';
        this.currentGoal.status = 'done';

        const prevIndex = this.currentGoal.index;
        const newIndex = (prevIndex + 1) < this.goals.length ? prevIndex + 1 : 0;

        const icons = this.state.selectorItems.slice();
        icons[prevIndex] = this.goalIconName(this.currentGoal);

        Database.setGoalStatus(this.goals[newIndex].name, 'unlocked');
        this.goals[newIndex].status = 'unlocked';

        this.setCurrentGoal(this.goals[newIndex]);
        this.setModalVisible(false);

        this.setState({
            nextVisible: true,
            selectorItems: icons,
            selectedIndex: prevIndex,
        });

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
        if (goal != null) {
            switch (goal.name) {
                case 'fiveguys':
                    return <BurgerModal modalVisible={this.state.modalVisible}
                        setModalVisible={(visible) => this.setModalVisible(visible)}
                        onGoalCompleted={() => this.onGoalCompleted()} goal={goal} />

                case 'bjj':
                    return <BJJModal modalVisible={this.state.modalVisible}
                        setModalVisible={(visible) => this.setModalVisible(visible)}
                        onGoalCompleted={() => this.onGoalCompleted()} goal={goal} />

                case 'theater':
                    return <TheaterModal modalVisible={this.state.modalVisible}
                        setModalVisible={(visible) => this.setModalVisible(visible)}
                        onGoalCompleted={() => this.onGoalCompleted()} goal={goal} />

                case 'home':
                    return <InfoModal modalVisible={this.state.modalVisible}
                        setModalVisible={(visible) => this.setModalVisible(visible)}
                        onGoalCompleted={() => this.onGoalCompleted()} goal={goal} proceedAction={() => this.goToGoal(this.state.selectedIndex + 1)} />

                default:
                    return <CodeModal modalVisible={this.state.modalVisible}
                        setModalVisible={(visible) => this.setModalVisible(visible)}
                        onGoalCompleted={() => this.onGoalCompleted()} goal={goal} />
            }
        }
        return null;
    }

    nextButton() {
        if (this.state.nextVisible) {
            return (
                <Icon.Button name={'arrow-right-thick'} color={Colors.headerOrange}
                    backgroundColor={Colors.headerGray} onPress={() => this.goToGoal(this.state.selectedIndex + 1)}>
                    <Text style={CommonStyles.proceedButtonText}>Next Clue</Text>
                </Icon.Button>
            );
        }
        return null;
    }

    goToGoal(index) {
        if (index >= this.goals.length) {
            index = 0;
        }
        const icons = this.state.selectorItems.slice();
        icons[index] = this.goalIconName(this.goals[index]);
        this.setState({
            blurAnim: this.goals[index].status === 'done' ? new Animated.Value(0) : new Animated.Value(1),
            nextVisible: this.goals[index].status === 'done',
            selectedIndex: index,
            selectorItems: icons,
        });
    }

    setModalVisible(visible) {
        if (this.goals[this.state.selectedIndex].status != 'locked') {
            this.setState({ modalVisible: visible });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.nextVisible ? <Image
                    source={this.images[this.state.selectedIndex]}
                    style={styles.ringImage}
                    resizeMode="contain"
                /> : null}
                <Animated.Image
                    source={this.images[this.state.selectedIndex]}
                    style={[styles.ringImage, { opacity: this.state.blurAnim }]}
                    resizeMode="cover"
                    blurRadius={this.state.selectedIndex === 0 ? 8 : 2}
                />
                <View style={styles.headerBand} />
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
                        selectedIndex={this.state.selectedIndex} selectorItems={this.state.selectorItems} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',

    },
    headerBand: {
        position: 'absolute',
        width: '100%',
        height: 54,
        top: 0,
        left: 0,
        backgroundColor: Colors.headerGray,
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
});