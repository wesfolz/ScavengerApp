import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';
import HeaderBar from './HeaderBar';

const FinalQuestionModal = ({ setModalVisible, modalVisible, onYes }) => {

    const makeSelection = () => {
        setModalVisible(false);
        onYes();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={CommonStyles.overlay}>
                <View style={CommonStyles.card}>
                    <HeaderBar headerText='One final question...' leftIconName='ring' />
                    <View style={styles.card}>
                        <TouchableOpacity onPress={() => alert('Incorrect!')} style={[styles.button, styles.no]}>
                            <Icon name="thumb-down-outline" size={125} color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => makeSelection()} style={[styles.button, styles.yes]}>
                            <Icon name="thumb-up-outline" size={125} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
}

const styles = StyleSheet.create({
    card: {
        //padding: 10,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
        display: 'flex',
    },
    button: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    yes: {
        backgroundColor: Colors.completionGreen,
    },
    no: {
        backgroundColor: Colors.ketchup,
    }
});

export default FinalQuestionModal;