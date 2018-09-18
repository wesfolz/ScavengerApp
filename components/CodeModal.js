import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, TextInput, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClueButton from './ClueButton.js';
import HeaderBar from './HeaderBar.js';
import FirebaseMain from '../database/FirebaseMain.js';

export default class CodeModal extends Component {

  static defaultProps = {
    bodyText: '',
    headerText: '',
    iconName: 'lock-question',
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      codeText: ''
    };
  }

  setModalVisible(visible) {
    if(this.props.goal.status != 'locked') {
      this.setState({modalVisible: visible});
    }
  }

  checkCode() {
    if(this.state.codeText === this.props.goal.code) {
      alert('Correct!');
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
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
        }}>
          <View style={styles.overlay}>
            <View style={styles.card}>
              <View style={styles.headerContainer}>
                <Icon name={this.props.iconName} size={30} color={'#E0E0E0'} underlayColor='#000000' style={styles.headerIcon}/>
                <Text style={styles.headerText}>{this.props.headerText}</Text>
                <Icon name={'close-circle'} size={30} color={'#E0E0E0'} 
                  underlayColor='#000000' style={styles.headerIcon} onPress={() => { this.setModalVisible(!this.state.modalVisible);
                }}/>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.textBackground}>
                  <Text style={styles.text}>{this.props.bodyText}</Text>
                  <TextInput onChangeText={(text) => this.setState({codeText: text})} value={this.state.codeText}
                    style={{backgroundColor: '#F2F2F2', width: '50%', margin: 10, height: 40}}/>
                  <Button title={'Submit'} onPress={ () => this.checkCode()}/>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <ClueButton status={this.props.goal.status} onPress={() => this.setModalVisible(true)}/>
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
    backgroundColor: '#E0E0E0',
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
    backgroundColor: '#2D9CDB',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
  },
  headerIcon:
  {
    backgroundColor: '#2D9CDB',
    margin: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "Roboto",
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
    fontFamily: 'Roboto',
    color: 'black', 
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '50%',
  }
});