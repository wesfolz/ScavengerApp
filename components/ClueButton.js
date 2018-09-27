import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ClueButton = (props) => {

  getIconName = () => {
    switch(props.status) {
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

  getColor = () => {
    switch(props.status) {
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

  let icon = null;
  if(props.status != 'done') {
    icon = <Icon onPress={props.onPress} name={getIconName()} size={250} color={getColor()}/>;
  }

  return icon;
}

export default ClueButton;