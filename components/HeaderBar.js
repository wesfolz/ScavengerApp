import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';

const HeaderBar = ({ headerText, leftIconPress, leftIconName, rightIconPress, rightIconName }) => {

    const backgroundColor = Colors.headerGray;
    const textColor = Colors.headerOrange;
    return (
        <View style={[CommonStyles.headerContainer, { backgroundColor: backgroundColor }]}>
            <TouchableHighlight underlayColor={'grey'} onPress={leftIconPress}>
                <Icon name={leftIconName} size={30} color={textColor}
                    style={[styles.messagesButton, { backgroundColor: backgroundColor }]}
                />
            </TouchableHighlight>

            <Text style={[CommonStyles.headerText, { color: textColor }]}>{headerText}</Text>
            <TouchableHighlight underlayColor={'grey'} onPress={rightIconPress}>
                <Icon name={rightIconName} size={30} color={textColor}
                    style={[styles.messagesButton, { backgroundColor: backgroundColor }]}
                />
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    messagesButton: {
        margin: 12,
    },
});

export default HeaderBar;