import React from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity } from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import SpeechBubble from './SpeechBubble';

const CompletionModal = ({ text, imageSrc, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible()}
        >
            <View style={CommonStyles.overlay}>
                <TouchableOpacity style={CommonStyles.imageCard} onPress={() => setModalVisible()}>
                    <Image
                        source={imageSrc}
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
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        position: "absolute",
        top: 0,
    },
});

export default CompletionModal;
