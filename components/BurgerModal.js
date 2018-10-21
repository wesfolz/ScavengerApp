import React from 'react';
import { StyleSheet, Modal, Text, View, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClueButton from './ClueButton';
import SpeechBubble from './SpeechBubble';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';

const BurgerModal = ({ goal, modalVisible, setModalVisible }) => {

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={CommonStyles.overlay}>
                    <View style={[CommonStyles.card, styles.card]}>
                        <View style={[CommonStyles.headerContainer, { backgroundColor: Colors.ketchup }]}>
                            <Icon name={goal.iconName} size={30} color={Colors.mustard} style={styles.headerIcon} />
                            <Text style={styles.headerText}>{goal.headerText}</Text>
                            <TouchableOpacity underlayColor={'grey'} onPress={() => setModalVisible(false)}>
                                <Icon name={'close-circle'} size={30} color={Colors.mustard}
                                    style={styles.headerIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <SpeechBubble text={goal.bodyText} />
                        <View style={CommonStyles.cardContent}>
                            <Icon name="youtube" size={50} color={Colors.ketchup} onPress={() =>
                                Linking.openURL('https://www.youtube.com/watch?v=oxv6-npAxpY')}
                            />
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
        backgroundColor: Colors.mustard,
    },
    headerIcon:
    {
        backgroundColor: Colors.ketchup,
        margin: 12,
    },
    headerText: {
        color: 'black',
        fontSize: 30,
        fontFamily: "Bob's Burgers",
        margin: 12,
    },
});

export default BurgerModal;