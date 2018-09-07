import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class HeaderBar extends Component {
  static defaultProps = {
    backgroundColor: '#4F4F4F',
    textColor: '#56CCF2',
    iconColor: '#56CCF2'
  };

  constructor() {
    super();
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
  },
  messagesButton: {
    margin: 12,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Roboto",
    margin: 12,
  }
});