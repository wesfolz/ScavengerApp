import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ClueButton extends Component {

  constructor(props) {
    super(props);
  }

  getIconName() {
    switch(this.props.status) {
      case 'locked':
        return 'lock';

      case 'unlocked':
        return 'help';

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
    let icon = null;
    if(this.props.status != 'done') {
      icon = <Icon onPress={this.props.onPress} name={this.getIconName()} size={250} color={this.getColor()}/>;
    }
    return icon;
  }
}