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
            this.setModalVisible(false);
        }}>
          <View style={styles.overlay}>
            <View style={styles.card}>
              <View style={styles.headerContainer}>
                <Icon name={'lock-question'} size={30} color={'#ffdb58'} underlayColor='#000000' style={styles.headerIcon}/>
                <Text style={styles.headerText}>{"There's some right here!"}</Text>
                <Icon name={'close-circle'} size={30} color={'#ffdb58'} 
                  underlayColor='#000000' style={styles.headerIcon} onPress={() => { this.setModalVisible(!this.state.modalVisible);
                }}/>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.textBackground}>
                  <Text style={styles.text}>{this.props.text}</Text>
                  <Icon name="youtube" size={50} color="#ce2522" onPress={ () => {
                    Linking.openURL('https://www.youtube.com/watch?v=oxv6-npAxpY')}}
                  />
                </View>
                {/*<Text>Play Video</Text>*/}
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
    borderRadius: 8,
    flexDirection: 'column',
    backgroundColor: '#ffdb58',
    justifyContent: 'flex-start',
    width: '90%', 
    height: '50%'
  },
  cardContent: {
    flex: 1,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#ce2522',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
  },
  headerIcon:
  {
    backgroundColor: '#ce2522',
    margin: 12,
  },
  headerText: {
    color: 'black',
    fontSize: 30,
    fontFamily: "Bob's Burgers",
    margin: 12,
  },
  textBackground: {
    backgroundColor: '#00000015', 
    borderRadius: 8, 
    width: '80%', 
    height: '80%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    color: 'black', 
    fontFamily: "Roboto",
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
});