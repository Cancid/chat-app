import React, { useContext } from 'react';
import UserList from './user-list';
import ChatBox from './chat-box';
import SendMessageForm from './send-message-form';
import './chat.css'
import { SocketContext } from '../context/socket';

class ChatWindow extends React.Component {

  socket = useContext(SocketContext)

  constructor(props) {
    super(props)
    this.state = {
      currentUser: "James",
      users: DUMMY_USERS,
      messages: DUMMY_DATA,
    }
  }

  handleNewMessage = (message) => {
    console.log(this.props.user)
    this.setState({
      messages: this.state.messages.concat([{
        user: this.props.user,
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
          </div>
          <div class="col">
            <UserList users={this.state.users} />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <SendMessageForm onNewMessage={this.handleNewMessage} />
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


