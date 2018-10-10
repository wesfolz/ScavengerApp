import React from 'react';
import { Modal, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ClueButton from './ClueButton';
import SpeechBubble from './SpeechBubble';
import HeaderBar from './HeaderBar';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';

const InfoModal = ({ goal, modalVisible, setModalVisible, proceedAction }) => {

    const proceedPress = () => {
        setModalVisible(false);
        proceedAction();
    };

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
                            <Icon.Button name={'arrow-right-thick'} color={Colors.headerOrange} onPress={() => proceedPress()}
                                backgroundColor={Colors.headerGray}>
                                <Text style={CommonStyles.proceedButtonText}>Proceed</Text>
                            </Icon.Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <ClueButton status={goal.status} onPress={() => setModalVisible(true)} />
        </View>
    );
}

export default InfoModal;