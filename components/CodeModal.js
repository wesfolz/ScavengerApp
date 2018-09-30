import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, TextInput, Button} from 'react-native';
import ClueButton from './ClueButton';
import HeaderBar from './HeaderBar';
import SpeechBubble from './SpeechBubble';

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
          <View style={styles.overlay}>
            <View style={styles.card}>
              {/*<View style={styles.headerContainer}>
                <Icon name={this.props.goal.iconName} size={30} color={'#E0E0E0'} style={styles.headerIcon}/>
                <Text style={styles.headerText}>{this.props.goal.headerText}</Text>
                <Icon name={'close-circle'} size={30} color={'#E0E0E0'} 
                  style={styles.headerIcon} onPress={() => { this.props.setModalVisible(false);
                }}/>
              </View>*/}
              <HeaderBar style={styles.headerContainer} headerText={this.props.goal.headerText} leftIconName={this.props.goal.iconName}
               rightIconPress={() => this.props.setModalVisible(false)} rightIconName={'close-circle'}/>
                <SpeechBubble text={this.props.goal.bodyText}/>
              <View style={styles.textBackground}>
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
    backgroundColor: '#2D9CDB',
    justifyContent: 'space-between',
    width: '90%', 
    height: 250,//'50%'
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
    /*
    flexDirection: 'row',
    backgroundColor: '#4F4F4F',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
    */
  },
  headerIcon:
  {
    backgroundColor: '#4F4F4F',
    margin: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    margin: 12,
  },
  textBackground: {
    backgroundColor: '#00000015', 
    borderRadius: 8, 
    //width: '80%', 
    //height: '80%', 
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    color: 'white', 
    fontSize: 16,
    fontWeight: 'bold',
  }
});