import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClueButton from './ClueButton.js';
import HeaderBar from './HeaderBar.js';

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
          <View style={styles.overlay}>
            <View style={styles.card}>
              <HeaderBar headerText={"There's some right here!"} leftIconName={'lock-question'} backgroundColor={'#ce2522'} iconColor={'#ffdb58'}
                rightIconName={'close-circle'} rightIconPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}/>
              <View style={styles.cardContent}>
                <Text style={styles.text}>{this.props.text}</Text>
                  <Icon name="youtube" size={50} color="#ce2522" onPress={ () => {
                      Linking.openURL('https://www.youtube.com/watch?v=oxv6-npAxpY')}
                    }
                  />
                  <Text>Play Video</Text>
              </View>
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
    //flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffdb58',//'#ce2522',//'#ffdb58',
    justifyContent: 'flex-start',
    //alignItems: 'center',
    //margin: 50,
    width: '90%', 
    height: '50%'
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black', 
    //backgroundColor: 'white',
    //width: '80%',
    //height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
