import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ClueButton from './ClueButton.js';
import SpeechBubble from './SpeechBubble.js';

const BurgerModal = ({goal, modalVisible, setModalVisible}) => {
  
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
        }}>
          <View style={styles.overlay}>
            <View style={styles.card}>
              <View style={styles.headerContainer}>
                <Icon name={goal.iconName} size={30} color={'#ffdb58'} style={styles.headerIcon}/>
                <Text style={styles.headerText}>{goal.headerText}</Text>
                <Icon name={'close-circle'} size={30} color={'#ffdb58'} 
                  style={styles.headerIcon} onPress={() => {setModalVisible(false)}}/>
              </View>

              <View style={styles.cardContent}>
                <SpeechBubble text={goal.bodyText}/>
                <View style={styles.textBackground}>
                  <Icon name="youtube" size={50} color="#ce2522" onPress={ () => {
                    Linking.openURL('https://www.youtube.com/watch?v=oxv6-npAxpY')}}
                  />
                </View>
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
    borderRadius: 8,
    flexDirection: 'column',
    backgroundColor: '#ffdb58',
    justifyContent: 'flex-start',
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
    //width: '100%', 
    //height: '80%', 
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    color: 'black', 
    fontFamily: "Bob's Burgers",
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
  }
});

export default BurgerModal;