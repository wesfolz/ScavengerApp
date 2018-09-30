import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, Linking, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClueButton from './ClueButton';
import SpeechBubble from './SpeechBubble';

const BJJModal = ({goal, modalVisible, setModalVisible}) => {

    return (
      <View>
        <Modal
          animationType="fade" 
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.card}>
              <View style={[styles.stripe, styles.headerContainer]}>
                <Icon name={'octagon'} size={30} color={'#BDBDBD'} style={styles.headerIcon}/>
                <Text style={styles.headerText}>{goal.headerText}</Text>
                <TouchableHighlight underlayColor={'grey'} onPress={() => setModalVisible(false)}>
                  <Icon name={'close-circle'} size={30} color={'#BDBDBD'} 
                    style={styles.headerIcon}
                  />
                </TouchableHighlight>
              </View>
              <View style={[styles.stripe, {backgroundColor: '#A0522D'}]}/>
              <View style={[styles.stripe, {backgroundColor: '#9B51E0'}]}>
                {/*<Text style={styles.text}>{goal.bodyText}</Text>*/}
              </View>
              <View style={[styles.stripe, {backgroundColor: '#2F80ED'}]}>
              </View>
              <View style={[styles.stripe, {backgroundColor: '#ffffff'}]}>
                <Icon name="youtube" size={50} color="#ce2522" onPress={ () =>
                  Linking.openURL('https://www.youtube.com/watch?v=oxv6-npAxpY')}
                />
                </View>
              <View style={{position: 'absolute', top:54, right: 0}}>
                <SpeechBubble text={goal.bodyText}/>
              </View>
            </View>
          </View>
        </Modal>
        <ClueButton status={goal.status} onPress={() => setModalVisible(true)}/>
      </View>
    );
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
    margin: 12,
  },
  text: {
    color: 'white', 
    fontSize: 14,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
});

export default BJJModal;