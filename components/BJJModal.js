import React from 'react';
import { StyleSheet, Modal, Text, View, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClueButton from './ClueButton';
import SpeechBubble from './SpeechBubble';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';

const BJJModal = ({ goal, modalVisible, setModalVisible }) => {

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={CommonStyles.overlay}>
                    <View style={styles.card}>
                        <View style={[styles.stripe, styles.headerContainer]}>
                            <Icon name={'octagon'} size={30} color={Colors.headerOrange} style={styles.headerIcon} />
                            <Text style={CommonStyles.headerText}>{goal.headerText}</Text>
                            <TouchableOpacity underlayColor={'grey'} onPress={() => setModalVisible(false)}>
                                <Icon name={'close-circle'} size={30} color={Colors.headerOrange}
                                    style={styles.headerIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.stripe, { backgroundColor: Colors.bjjBrown }]} />
                        <View style={[styles.stripe, { backgroundColor: Colors.bjjPurple }]}>
                            {/*<Text style={styles.text}>{goal.bodyText}</Text>*/}
                        </View>
                        <View style={[styles.stripe, { backgroundColor: Colors.bjjBlue }]}>
                        </View>
                        <View style={[styles.stripe, { backgroundColor: 'white' }]}>
                            <Icon name="youtube" size={50} color={Colors.ketchup} onPress={() =>
                                Linking.openURL('https://www.youtube.com/watch?v=oxv6-npAxpY')}
                            />
                        </View>
                        <View style={{ position: 'absolute', top: 54, right: 0 }}>
                            <SpeechBubble text={goal.bodyText} />
                        </View>
                    </View>
                </View>
            </Modal>
            <ClueButton status={goal.status} onPress={() => setModalVisible(true)} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 4,
        flexDirection: 'column',
        width: '90%',
        borderWidth: 5,
        borderColor: Colors.headerGray,
        backgroundColor: Colors.headerGray,
    },
    headerContainer: {
        justifyContent: 'space-between',
    },
    stripe: {
        height: 54,
        borderRadius: 3,
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon:
    {
        backgroundColor: 'black',
        margin: 12,
    },
    text: {
        color: 'white',
        fontSize: 14,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
});

export default BJJModal;