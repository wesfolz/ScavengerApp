import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/Colors';

const ClueButton = (props) => {

  getIconName = () => {
    switch(props.status) {
      case 'locked':
        return 'lock';

      case 'unlocked':
        return 'help';

      default:
        return 'lock';
    }
  }

  getColor = () => {
    switch(props.status) {
      case 'locked':
        return Colors.headerGray;

      case 'unlocked':
        return Colors.questionBlue;

      default:
        return '#333333';
    }
  }

  let icon = null;
  if(props.status != 'done') {
    icon = <Icon onPress={props.onPress} name={getIconName()} size={250} color={getColor()}/>;
  }

  return icon;
}

export default ClueButton;