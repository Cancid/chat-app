import React from 'react';
import UserList from './user-list';
import ChatBox from './chat-box';
import SendMessageForm from './send-message-form';
import './chat.css'
import io from 'socket.io-client'

const SERVER = "http://127.0.0.1:3001";

// const socket = io(SERVER, { transports: ['websocket'] });
// socket.on('connection', function(connection) {
//   console.log(connection);
// });

class ChatWindow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      messages: [],
    };

    this.socket = io(SERVER, { 
      transports: ['websocket'],
      auth: { username: this.props.user },
     })
  }

  componentDidMount() {
    this.socket.on('connection', function(connection) {
      console.log(connection);
    });

    this.socket.on('chat message', (message) => {
      console.log(message)
      this.setState({
        messages: this.state.messages.concat([
          message
        ]),
      })
    })

    this.socket.on('users', (usersOnline) => {
      this.setState({
        users: usersOnline
      })
    }) 
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleNewMessage = (message) => {
    console.log(this.props.user)
    this.socket.emit('chat message', {
      user: this.props.user,
      text: message,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Start Chatting!</h1>
          <div className="col">
            <ChatBox messages={this.state.messages} />
          </div>
          <div className="col">
            <UserList users={this.state.users} />
          </div>
        </div>
        <div className="row">
          <div className="col">
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


