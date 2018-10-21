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
import LoadingModal from './LoadingModal';
import CompletionModal from './CompletionModal';
import CommonStyles from '../styles/CommonStyles';
import FinalQuestionModal from './FinalQuestionModal';

export default class ScavengerMain extends Component {

    constructor(props) {
        super(props);

        this.geolocator = new Geolocation('Alexa');
        this.ringImages = [
            require("../images/ring.jpg"),
            require("../images/ring_0.png"),
            require("../images/ring_1.png"),
            require("../images/ring_2.png"),
            require("../images/ring_3.png"),
            require("../images/ring_4.png"),
            require("../images/ring_5.png"),
            require("../images/ring_6.png"),
        ];

        this.completionImages = [
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
        this.finalGoal = null;
        this.state = {
            blurAnim: new Animated.Value(1),
            selectedIndex: 0,
            selectorItems: [],
            nextVisible: false,
            modalVisible: false,
            loading: true,
            completionVisible: false,
            finaleVisible: false,
        };
        Database.getGoalsRef().once('value').then((goals) => this.setGoals(goals.val()));
    }

    componentWillUnmount() {
        this.geolocator.clearWatch();
    }

    setGoals(goals) {
        this.goals = Object.keys(goals).map((key) => {
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
        Database.getCurrentGoalRef().once('value').then((goal) => this.setInitialGoal(goal.val()));
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
        return "none";
    }

    setInitialGoal(goal) {
        this.setCurrentGoal(goal);
        this.setState({
            selectedIndex: this.currentGoal.index
        });
        Database.getFinalGoalRef().on('value', (goal) => this.setFinalGoal(goal.val()));
    }

    setFinalGoal(goal) {
        if (this.finalGoal == null) {
            this.finalGoal = goal;

            if (this.currentGoal.name === this.finalGoal.name) {
                this.goals[0] = this.finalGoal;
            }
            this.setState({
                loading: false,
            })
        }
        else if (this.currentGoal.name === this.finalGoal.name) {
            Messaging.sendLocalNotification('One question...');
            Database.setGoalStatus('home', 'done');
            this.goals[this.currentGoal.index].status = 'done';
            this.currentGoal.status = 'done';
            this.goToGoal(0);
            this.setState({
                finaleVisible: true,
            })
        }
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

    proceedFromHome() {
        if (this.currentGoal.name === 'home') {
            this.setModalVisible(false);
            this.unlockGoal(1);
        }
        this.goToGoal(1);
    }

    unlockGoal(index) {
        this.goals[index].status = 'unlocked';
        Database.setGoalStatus(this.goals[index].name, 'unlocked');
        this.setCurrentGoal(this.goals[index]);
    }

    onGoalCompleted() {
        if (this.currentGoal.type === 'location') {
            Messaging.sendLocalNotification('Well Done!', 'Goal ' + this.currentGoal.name + ' completed!');
        }

        Database.setGoalStatus(this.currentGoal.name, 'done');
        this.goals[this.currentGoal.index].status = 'done';
        this.currentGoal.status = 'done';

        const prevIndex = this.currentGoal.index;
        const finale = (prevIndex + 1) >= this.goals.length;
        const newIndex = finale ? 0 : prevIndex + 1;

        const selectorItems = this.state.selectorItems.slice();
        selectorItems[prevIndex] = this.goalIconName(this.currentGoal);

        if (finale) {
            this.goals[0] = this.finalGoal;
            this.setCurrentGoal(this.goals[0]);
        } else {
            this.unlockGoal(newIndex);
        }

        this.setModalVisible(false);

        this.setState({
            selectorItems,
            selectedIndex: prevIndex,
            completionVisible: true,
        });
        //this.unlockGoal(newIndex);
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
                        goal={goal} proceedAction={() => this.proceedFromHome()} />

                case 'finale':
                    return <InfoModal modalVisible={this.state.modalVisible}
                        setModalVisible={(visible) => this.setModalVisible(visible)}
                        goal={goal} proceedAction={() => this.setModalVisible(false)} />

                default:
                    return <CodeModal modalVisible={this.state.modalVisible}
                        setModalVisible={(visible) => this.setModalVisible(visible)}
                        onGoalCompleted={() => this.onGoalCompleted()} goal={goal} />
            }
        }
        return null;
    }

    completionModal() {
        const goal = this.goals[this.state.selectedIndex];
        if (goal != null) {
            return (
                <CompletionModal imageSrc={this.completionImages[this.state.selectedIndex - 1]}
                    text={goal.completionMessage || "Looks like we just missed Papa."}
                    setModalVisible={() => this.completeGoal()} modalVisible={this.state.completionVisible} />
            );
        }
        return null;
    }

    nextButton() {
        if (this.state.nextVisible) {
            const nextIndex = this.state.selectedIndex + 1;
            return (
                <Icon.Button name={'arrow-right-thick'} color={Colors.headerOrange}
                    backgroundColor={Colors.headerGray} onPress={() => this.goToGoal(nextIndex)}>
                    <Text style={CommonStyles.proceedButtonText}>{nextIndex >= this.goals.length ? 'Go Home' : 'Next Clue'}</Text>
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

    completeGoal() {
        Animated.timing(                  // Animate over time
            this.state.blurAnim,            // The animated value to drive
            {
                toValue: 0,                   // Animate to opacity: 1 (opaque)
                easing: Easing.inOut(Easing.ease),
                duration: 5000,              // Make it take a while
                useNativeDriver: true,
            }).start();                        // Starts the animation

        this.setState({
            completionVisible: false,
            nextVisible: true,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <LoadingModal modalVisible={this.state.loading} />
                {this.state.nextVisible ? <Image
                    source={this.ringImages[this.state.selectedIndex]}
                    style={CommonStyles.imageFull}
                    resizeMode="contain"
                /> : null}
                <Animated.Image
                    source={this.ringImages[this.state.selectedIndex]}
                    style={[CommonStyles.imageFull, { opacity: this.state.blurAnim }]}
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
                {this.completionModal()}
                <FinalQuestionModal setModalVisible={(visible) => this.setState({ finaleVisible: visible })} modalVisible={this.state.finaleVisible} onYes={() => this.completeGoal()} />
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