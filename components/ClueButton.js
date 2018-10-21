import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/Colors';

const ClueButton = ({ status, onPress }) => {

    getIconName = () => {
        switch (status) {
            case 'locked':
                return 'lock';

            case 'unlocked':
                return 'help';

            default:
                return 'lock';
        }
    }

    getColor = () => {
        switch (status) {
            case 'locked':
                return Colors.headerGray;

            case 'unlocked':
                return Colors.questionBlue;

            default:
                return '#333333';
        }
    }

    if (status != 'done') {
        return (
            <TouchableOpacity underlayColor='grey' onPress={onPress}>
                <Icon name={getIconName()} size={250} color={getColor()} />
            </TouchableOpacity>
        );
    }

    return null;
}

export default ClueButton;