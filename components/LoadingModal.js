import React from 'react';
import { StyleSheet, Modal, Text, View, ActivityIndicator, Image } from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';

const LoadingModal = ({ modalVisible }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => console.log("requestClose")}
        >
            <View style={styles.container}>
                <Image
                    source={require('../images/icon.png')}
                    style={CommonStyles.imageFull}
                    resizeMode="contain"
                />
                <ActivityIndicator size="large" color={Colors.questionBlue} />
                <Text style={styles.textStyle}>Loading...</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        justifyContent: 'flex-end',
    },
    textStyle: {
        textAlign: 'center',
        color: Colors.questionBlue,
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default LoadingModal;