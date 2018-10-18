import React from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity } from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import SpeechBubble from './SpeechBubble';
import Colors from '../styles/Colors';


const CompletionModal = ({ text, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={CommonStyles.overlay}>
                <TouchableOpacity style={[CommonStyles.card, styles.card]} onPress={() => setModalVisible(false)}>
                    <Image
                        source={require('../images/IMG_20181013_142608.jpg')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <SpeechBubble text={text} />
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: Colors.completionGreen,
    },
    image: {
        width: '100%',
        flex: 1,
    }
});

export default CompletionModal;
