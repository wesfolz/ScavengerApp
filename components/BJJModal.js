import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClueButton from './ClueButton.js';
import HeaderBar from './HeaderBar.js';

export default class BJJModal extends Component {
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
            this.setModalVisible(false)}}
        >
          <View style={styles.overlay}>
            <View style={styles.card}>
              <View style={[styles.stripe, styles.headerContainer]}>
                <Icon name={'octagon'} size={30} color={'#BDBDBD'} style={styles.headerIcon}/>
                <Text style={styles.headerText}>{this.props.headerText}</Text>
                <Icon name={'close-circle'} size={30} color={'#BDBDBD'} 
                  style={styles.headerIcon} onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
              />
              </View>
              <View style={[styles.stripe, {backgroundColor: '#A0522D'}]}/>
              <View style={[styles.stripe, {backgroundColor: '#9B51E0'}]}>
                <Text style={styles.text}>{this.props.bodyText}</Text>
              </View>
              <View style={[styles.stripe, {backgroundColor: '#2F80ED'}]}>
                <Icon name="youtube" size={50} color="#ce2522" onPress={ () => {
                    Linking.openURL('https://www.youtube.com/watch?v=oxv6-npAxpY')}}
                />
              </View>
              <View style={[styles.stripe, {backgroundColor: '#ffffff'}]}/>
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
    borderRadius: 4,
    flexDirection: 'column',
    width: '90%', 
    borderWidth: 5,
    borderColor: '#4F4F4F',
    backgroundColor: '#4F4F4F',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  stripe: {
    height: 54,
    borderRadius: 3,
    flexDirection: 'row',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon:
  {
    backgroundColor: 'black',
    margin: 12,
  },
  headerText: {
    color: '#BDBDBD',
    fontSize: 18,
    fontFamily: "Roboto",
    margin: 12,
  },
  text: {
    color: 'white', 
    fontFamily: "Roboto",
    fontSize: 14,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
});