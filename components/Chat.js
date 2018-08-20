import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import FirebaseMain from '../database/FirebaseMain.js'

export default class Chat extends Component {
  
  constructor(props){
    super(props);
  }

  state = {
    messages: [],
  }

  /*
  messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        }
  */

  componentWillMount() {
    FirebaseMain.getMessageRef(this.props.user).on('child_added', (data) => this.displayMessages(data.val()));
    
    FirebaseMain.getMessageRef(this.props.interlocutor).once('value').then((data) => this.populateMessages(data.val()));
    /*
    FirebaseMain.getMessageRef(this.props.interlocutor).once().then((data) => this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, data.val()),
    })));
    */
  }

  populateMessages(data) {
    var messages = [];
    for(var key in data) {
      messages.push(data[key]);
    }
    this.displayMessages(messages);
  }

  displayMessages(messages) {
    console.log(messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  onSend(messages = []) {
    this.displayMessages(messages);
    FirebaseMain.addMessage(this.props.interlocutor, messages[messages.length - 1]);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          name: this.props.user
        }}
      />
    )
  }
}
