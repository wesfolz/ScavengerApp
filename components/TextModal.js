import React, {Component} from 'react';
import {StyleSheet, Modal, Text, TouchableHighlight, View, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import YouTube from 'react-native-youtube'

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
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <YouTube
            apiKey='AIzaSyC185MHv1NTRdL2c7USZ0O3ChwYrko6-5c'
            videoId="SGk6swWqhF4"   // The YouTube video ID
            play={false}             // control playback of video with true/false
            fullscreen={true}       // control whether the video should play in fullscreen or inline
            loop={false}             // control whether the video should loop when ended

            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}

            style={[
              { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
              styles.player,
            ]}
          />
          <Icon name="close-circle" size={30} color="#900" style={styles.closeButton} onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
          </Icon>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal bro</Text>
        </TouchableHighlight>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  }
});
