import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/Colors';

const SideSelector = ({ selectedSize = 50, normalSize = 25, normalColor = 'black',
    selectedColor = Colors.headerOrange, selectorItems = [], selectorPress, selectedIndex }) => {

    return (
        <View style={styles.sideSelector}>
            {
                selectorItems.map((item, index) => (
                    <Icon key={index} name={item} onPress={() => selectorPress(index)}
                        size={(index === selectedIndex ? selectedSize : normalSize)}
                        color={(index === selectedIndex ? selectedColor : normalColor)}
                        style={styles.selector} />))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    sideSelector: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    selector: {
        marginRight: 5,
        marginBottom: 2,
        alignItems: 'center',
    }
});

export default SideSelector;