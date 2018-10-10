import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ClueButton from './ClueButton';
import HeaderBar from './HeaderBar';
import SpeechBubble from './SpeechBubble';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';

export default class CodeModal extends Component {

    static defaultProps = {
        goal: {
            bodyText: '',
            headerText: '',
            iconName: 'lock-question',
            modalVisible: false,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            codeText: ''
        };
    }

    checkCode() {
        if (this.state.codeText === this.props.goal.code) {
            this.setState({
                codeText: '',
            });
            this.props.onGoalCompleted();
        }
        else {
            alert('Incorrect!');
        }
    }

    bottomPanel() {
        return (
            this.props.goal.status === 'done' ?
                <View style={CommonStyles.cardContent}>
                    <Icon name="check-circle" color={Colors.headerOrange} size={30} />
                    <Text style={[styles.text, { color: Colors.headerOrange }]}>{this.props.goal.code}</Text>
                </View>
                :
                <View style={CommonStyles.cardContent}>
                    <Text style={styles.text}>Code:</Text>
                    <TextInput onChangeText={(text) => this.setState({ codeText: text })} value={this.state.codeText}
                        style={{ backgroundColor: Colors.inputBlue, width: '50%', margin: 10, height: 40 }} />
                    <Button color={Colors.headerGray} title={'Submit'} onPress={() => this.checkCode()} />
                </View>
        );
    }



    render() {
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        this.props.setModalVisible(false);
                    }}>
                    <View style={CommonStyles.overlay}>
                        <View style={CommonStyles.card}>
                            <HeaderBar headerText={this.props.goal.headerText} leftIconName={this.props.goal.iconName}
                                rightIconPress={() => this.props.setModalVisible(false)} rightIconName={'close-circle'} />
                            <SpeechBubble text={this.props.goal.bodyText} />
                            {this.bottomPanel()}
                        </View>
                    </View>
                </Modal>
                <ClueButton status={this.props.goal.status} onPress={() => this.props.setModalVisible(true)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});