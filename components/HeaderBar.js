import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HeaderBar extends Component {
  static defaultProps = {
    backgroundColor: '#4F4F4F',
    textColor: 'black',
    iconColor: '#56CCF2'
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
      <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
        {/*<ClueButton style={styles.flexPosition}/>*/}
        <Icon name={this.props.leftIconName} size={30} color={this.props.iconColor} 
          style={[styles.messagesButton, {backgroundColor: this.props.backgroundColor}]} underlayColor='#000000' onPress={this.props.leftIconPress}/>
        <Text style={[styles.headerText, {color: this.props.textColor}]}>{this.props.headerText}</Text>
        <Icon name={this.props.rightIconName} size={30} color={this.props.iconColor} 
          style={[styles.messagesButton, {backgroundColor: this.props.backgroundColor}]} underlayColor='#000000' onPress={this.props.rightIconPress}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#4F4F4F',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: 'black',
    //fontWeight: 'bold',
    fontSize: 30,
    fontFamily: "Bob's Burgers",
    margin: 12,
  }
});
