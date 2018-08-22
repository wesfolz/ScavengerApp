import React, {Component} from 'react';
import {StyleSheet, Modal, Text, TouchableHighlight, View, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClueButton from './ClueButton.js';

export default class VideoModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View style={styles.overlay} >
            <View style={styles.card}>
              <Icon name="close-circle" size={30} color="#ffffff" style={styles.closeButton} onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
              </Icon>
              <Text style={{color: 'white'}}>Hello</Text>
            </View>
          </View>
        </Modal>

        <ClueButton onPress={() => this.setState({modalVisible: true})}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#ffffff80', 
    width: '100%', 
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
    //margin: 50,
    width: '90%', 
    height: '50%'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  }
});
