import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Linking, Image} from 'react-native';
import Chat from './Chat.js';
import ClueButton from './ClueButton';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome'

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
            source={require('../images/ring_2.png')}
            style={styles.ringImage}
            resizeMode="contain"
          />
          <Icon name={'lock'} size={30} color={'black'} onPress = {() => 
            this.props.navigation.navigate('Chat')}/>

          <Icon name={'lock'} size={30} color={'black'} onPress = {() => 
            this.props.navigation.navigate('Chat')}/>

          <TextModal text={'I think Papa is hungry!'}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
