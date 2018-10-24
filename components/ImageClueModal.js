import React from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity } from 'react-native';
import HeaderBar from './HeaderBar';
import CommonStyles from '../styles/CommonStyles';
import SpeechBubble from './SpeechBubble';

const ImageClueModal = ({ goal, imageSrc, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={CommonStyles.overlay}>
                <View style={[CommonStyles.card, styles.card]}>
                    <HeaderBar headerText={goal.headerText} leftIconName={goal.iconName}
                        rightIconPress={() => setModalVisible(false)} rightIconName={'close-circle'} />
                    <Image
                        source={imageSrc}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={styles.bubble}>
                        <SpeechBubble text={goal.bodyText} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    card: {
        justifyContent: "flex-start",
    },
    image: {
        width: undefined,// '100%',
        height: undefined,//'100%',
        flex: 1,
        borderRadius: 8,
        margin: 5,
    },
    bubble: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    }
});

export default ImageClueModal;
