import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HeaderBar extends Component {
  static defaultProps = {
    backgroundColor: '#4F4F4F',
    textColor: '#F2994A',
    iconColor: '#F2994A'
  };

  constructor() {
    super();
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
        <TouchableHighlight underlayColor={'grey'} onPress={this.props.leftIconPress}>
          <Icon name={this.props.leftIconName} size={30} color={this.props.iconColor} 
            style={[styles.messagesButton, {backgroundColor: this.props.backgroundColor}]} 
          />
        </TouchableHighlight>

        <Text style={[styles.headerText, {color: this.props.textColor}]}>{this.props.headerText}</Text>
        <TouchableHighlight underlayColor={'grey'} onPress={this.props.rightIconPress}>
          <Icon name={this.props.rightIconName} size={30} color={this.props.iconColor} 
            style={[styles.messagesButton, {backgroundColor: this.props.backgroundColor}]} 
          />
        </TouchableHighlight>
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
    width: '100%',
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