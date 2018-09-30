import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import FirebaseMain from '../database/FirebaseMain'

export default class Chat extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      messages: [],
    }
    this.firstCall = true;
  }

  componentWillMount() {
    FirebaseMain.getMessageRef(this.props.user).on('child_added', (data) => this.messageReceived(data.val()));
    FirebaseMain.getMessageRef(this.props.interlocutor).once('value').then((data) => this.populateMessages(data.val()));
  }

  sortMessages() {
    var messages = [].concat(this.state.messages);
    messages.sort(this.compareMessages);
    this.setState({messages: messages});//, this.logMessages);
  }

  compareMessages(a, b) {
    if(a.createdAt < b.createdAt) {
      return 1;
    }
    else if(a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  }

  populateMessages(data) {
    var messages = [];
    for(var key in data) {
      messages.push(data[key]);
    }
    messages = this.state.messages.concat(messages);
    this.setState({
      messages: messages,
    }, this.sortMessages);
    this.firstCall = false;
  }

  messageReceived(messages) {
    if(this.props.onReceiveMethod != null && !this.firstCall) {
      this.props.onReceiveMethod();
    }
    this.updateMessages(messages);
  }

  updateMessages(messages) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  onSend(messages = []) {
    this.updateMessages(messages);
    FirebaseMain.addMessage(this.props.interlocutor, messages[messages.length - 1]);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          name: this.props.user,
        }}
      />
    )
  }
}