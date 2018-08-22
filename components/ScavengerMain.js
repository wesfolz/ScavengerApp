/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Linking, Image} from 'react-native';
import Chat from './Chat.js';
import ClueButton from './ClueButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderBar from './HeaderBar.js';
import TextModal from './TextModal.js';

export default class ScavengerMain extends Component {

  static navigationOptions = {
    drawerLabel: 'Main',
    drawerIcon: () => (
      <Icon name='chat' size={30} />
    ),
  };

  constructor() {
    super();
  }

  /*
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoloactor.watchId);
  }
  */

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/ring.jpg')}
          style={styles.ringImage}
          resizeMode="contain"
        />
        <HeaderBar iconName={'chat'} iconPress={() => this.props.navigation.openDrawer()}/>
        {/*<ClueButton onPress={() => this.setState({displayModal: true})}/>*/}
        <TextModal />
        <View style={{position: 'absolute', left: 100, top: 200, width: 100, height: 100, backgroundColor: '#ffffff80'}} />
        {/*<Chat style={styles.overlay} fire={this.fire} user={this.user} interlocutor={'Puppy Jean'}/>*/}
        {/*<View style={styles.container}>*/}
          {/*<Button title="Click me" onPress={ ()=>{ Linking.openURL('https://www.youtube.com/watch?v=oxv6-npAxpY')}} />*/}
        {/*</View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
  },
  ringImage: {
    position: 'absolute', //flex 1
    width: '100%', //undefined 
    height: '100%', //undefined
    top: 0, 
    left: 0, 
  },
  messagesButton: {
    backgroundColor: '#000000',
    /*position: 'absolute',
    top: 10,
    right: 10*/

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
