import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/Colors';

const SideSelector = ({ selectedSize = 50, normalSize = 25, normalColor = Colors.headerGray,
    selectedColor = Colors.headerOrange, selectorItems = [], selectorPress, selectedIndex }) => {

    return (
        <View style={styles.sideSelector}>
            {
                selectorItems.map((item, index) => (
                    <TouchableOpacity key={index} underlayColor='grey' onPress={() => selectorPress(index)}>
                        <Icon name={item}
                            size={(index === selectedIndex ? selectedSize : normalSize)}
                            color={(index === selectedIndex ? selectedColor : normalColor)}
                            style={styles.selector} />
                    </TouchableOpacity>
                ))
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