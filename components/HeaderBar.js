import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';

const HeaderBar = ({ headerText, leftIconPress, leftIconName, rightIconPress, rightIconName }) => {

    const textColor = Colors.headerOrange;

    return (
        <View style={[CommonStyles.headerContainer, { backgroundColor: Colors.headerGray }]}>
            <TouchableOpacity underlayColor={'grey'} onPress={leftIconPress}>
                <Icon name={leftIconName} size={30} color={textColor}
                    style={styles.messagesButton}
                />
            </TouchableOpacity>

            <Text style={[CommonStyles.headerText, { color: textColor }]}>{headerText}</Text>
            <TouchableOpacity underlayColor={'grey'} onPress={rightIconPress}>
                <Icon name={rightIconName} size={30} color={textColor}
                    style={styles.messagesButton}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    messagesButton: {
        margin: 12,
        backgroundColor: Colors.headerGray,
    },
});

export default HeaderBar;