import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderBar = ({headerText, leftIconPress, leftIconName, rightIconPress, rightIconName}) => {

  const backgroundColor = '#4F4F4F';
  const textColor = '#F2994A';
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <TouchableHighlight underlayColor={'grey'} onPress={leftIconPress}>
        <Icon name={leftIconName} size={30} color={textColor} 
          style={[styles.messagesButton, {backgroundColor: backgroundColor}]} 
        />
      </TouchableHighlight>

      <Text style={[styles.headerText, {color: textColor}]}>{headerText}</Text>
      <TouchableHighlight underlayColor={'grey'} onPress={rightIconPress}>
        <Icon name={rightIconName} size={30} color={textColor} 
          style={[styles.messagesButton, {backgroundColor: backgroundColor}]} 
        />
      </TouchableHighlight>
    </View>
  );
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
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    margin: 12,
  }
});

export default HeaderBar;