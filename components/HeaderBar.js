/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Linking, WebView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HeaderBar extends Component {

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
        <Icon name={this.props.iconName} size={30} color={'#56CCF2'} style={styles.messagesButton} underlayColor='#000000' onPress={this.props.iconPress}/>
        <Text style={styles.headerText}>Header</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#4F4F4F',
    justifyContent: 'flex-start',
    height: 54,
    //width: 10,
  },
  messagesButton: {
    backgroundColor: '#4F4F4F',
    margin: 12,
    /*position: 'absolute',
    top: 10,
    right: 10*/

  },
  headerText: {
    //color: '#56CCF2',
    color: '#56CCF2',
    //fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Roboto',
    margin: 12,
  }
});
