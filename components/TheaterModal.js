import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, TextInput, Button} from 'react-native';
import ClueButton from './ClueButton';
import HeaderBar from './HeaderBar';
import SpeechBubble from './SpeechBubble';
import CommonStyles from '../styles/CommonStyles';

export default class TheaterModal extends Component {

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
    if(this.state.codeText === this.props.goal.code) {
      this.setState({
        codeText: '',
      });
      this.props.onGoalCompleted();
    }
    else {
      alert('Incorrect!');
    }
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
               rightIconPress={() => this.props.setModalVisible(false)} rightIconName={'close-circle'}/>
                <SpeechBubble text={this.props.goal.bodyText}/>
              <View style={CommonStyles.cardContent}>
                <Text style={styles.text}>Code:</Text>
                <TextInput onChangeText={(text) => this.setState({codeText: text})} value={this.state.codeText}
                  style={{backgroundColor: '#F2F2F2', width: '50%', margin: 10, height: 40}}/>
                <Button color={'#4F4F4F'} title={'Submit'} onPress={() => this.checkCode()}/>
              </View>
            </View>
          </View>
        </Modal>
        <ClueButton status={this.props.goal.status} onPress={() => this.props.setModalVisible(true)}/>
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