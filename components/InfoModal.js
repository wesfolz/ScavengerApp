import React from 'react';
import { Modal, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SpeechBubble from './SpeechBubble';
import HeaderBar from './HeaderBar';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';

const InfoModal = ({ goal, modalVisible, setModalVisible, proceedAction }) => {
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={CommonStyles.overlay}>
                    <View style={CommonStyles.card}>
                        <HeaderBar headerText={goal.headerText} leftIconName={goal.iconName}
                            rightIconPress={() => setModalVisible(false)} rightIconName={'close-circle'} />
                        <SpeechBubble text={goal.bodyText} />
                        <View style={CommonStyles.cardContent}>
                            <Icon.Button name={'thumb-up'} color={Colors.headerOrange} onPress={() => proceedAction()}
                                backgroundColor={Colors.headerGray}>
                                <Text style={CommonStyles.proceedButtonText}>Ok</Text>
                            </Icon.Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default InfoModal;