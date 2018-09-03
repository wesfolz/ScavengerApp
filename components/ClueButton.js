import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ClueButton extends Component {

  constructor(props) {
    super(props);
  }

  state = {
      iconName: 'lock',
      iconColor: '#000000'
  };

  render() {
    return (
      <Icon name={this.state.iconName} size={30} color={this.state.iconColor}
      onPress={this.props.onPress}
      //onPress={() => { this.setState({iconName: 'check-circle', iconColor: '#228B22'})}}
      />
    );
  }
}