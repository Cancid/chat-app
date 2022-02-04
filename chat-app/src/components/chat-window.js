import React from 'react';
import UserList from './user-list';
import ChatBox from './chat-box';
import SendMessageForm from './send-message-form';
class ChatWindow extends React.Component {
  
  constructor() {
    super()
    this.state = {
      currentUser: "James",
      users: DUMMY_USERS,
      messages: DUMMY_DATA,
    }
  }

  handleNewMessage = (message) => {
    this.setState({
      messages: this.state.messages.concat([{
        user: this.state.currentUser,
        text: message,
      }]),
    })
    console.log(this.state.messages)
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <h1>Start Chatting!</h1>
          <div class="col">
            <ChatBox messages={this.state.messages} />
            <SendMessageForm onNewMessage={this.handleNewMessage} />
          </div>
          <div class="col">
            <UserList />
          </div>
        </div>
      </div>
    );
  }
};

const DUMMY_DATA = [
  {
    user: 'Bob',
    text: 'Hello there!'
  },
  {
    user: 'Joe',
    text: "Hi Bob!"
  }
]

const DUMMY_USERS = [
  { user : 'Bob'},
  { user : 'Joe'}
]


export default ChatWindow;


