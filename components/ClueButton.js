import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class ClueButton extends Component {

  constructor(props) {
    super(props);
  }

  getIconName() {
    switch(this.props.status) {
      case 'locked':
        return 'lock';

      case 'unlocked':
        return 'question';

      case 'done':
        return 'check';

      default:
        return 'lock';
    }
  }

  getColor() {
    switch(this.props.status) {
      case 'locked':
        return '#333333';

      case 'unlocked':
        return '#2D9CDB';

      case 'done':
        return '#27AE60';

      default:
        return '#333333';
    }
  }

  render() {
    return (
      <Icon name={this.getIconName()} size={250} color={this.getColor()}
        onPress={this.props.onPress}
      //onPress={() => { this.setState({iconName: 'check-circle', iconColor: '#228B22'})}}
      />
    );
  }
}