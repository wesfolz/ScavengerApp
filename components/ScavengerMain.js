/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Linking, WebView} from 'react-native';
import Chat from './Chat.js';
import ClueButton from './ClueButton';
import Icon from 'react-native-vector-icons/MaterialIcons'

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
        {/*<ClueButton style={styles.flexPosition}/>*/}
        <Icon name={'chat'} size={30} color={'#0000ff'} style={styles.messagesButton} underlayColor='#000000' onPress={() => this.props.navigation.openDrawer()}/>
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
  },
  messagesButton: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 10,
    right: 10

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
