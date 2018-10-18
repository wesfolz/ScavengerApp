import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';

import Colors from '../styles/Colors';

export default ({ text }) => {

    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <ScrollView>
                    <Text style={styles.speechText}>
                        {text}
                    </Text>
                </ScrollView>
            </View>
            <Image
                source={require('../images/Tiberius.jpg')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexShrink: 1,
    },
    bubble: {
        borderRadius: 25,
        padding: 8,
        marginTop: 10,
        backgroundColor: Colors.overlayWhite,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        borderRadius: 100,
        width: 80,
        height: 80,
        marginRight: 5,
    },
    speechText: {
        fontSize: 24,
        fontFamily: "Bob's Burgers",
        textAlign: 'center',
        color: 'black',
    },
});