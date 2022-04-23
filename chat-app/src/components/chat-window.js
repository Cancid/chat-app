import React from 'react';
import UserList from './user-list';
import ChatBox from './chat-box';
import SendMessageForm from './send-message-form';
import './chat.css'
import io from 'socket.io-client'

//const SERVER = "http://127.0.0.1:3001";

class ChatWindow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentRoom: '',
      users: [],
      messages: [],
    };

    this.socket = io("http://127.0.0.1:3001", { 
      transports: ['websocket'],
      auth: { username: this.props.user },
     })
  }

  componentDidMount() {
    this.socket.on('connection', function(connection) {
      console.log(connection);
    });

    this.socket.on('user joined', (userJoined) => {
      console.log(userJoined)
      this.setState({
        messages: this.state.messages.concat([
          userJoined
        ]),
      });
    })

    this.socket.on('chat message', (message) => {
      console.log(message)
      this.setState({
        messages: this.state.messages.concat([
          message
        ]),
      });
    });

    this.socket.on('users', (usersOnline) => {
      this.setState({
        users: usersOnline
      });
      console.log(this.state.users)
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleNewMessage = (message) => {
    console.log('Handling Message')
    this.socket.emit('chat message', {
      // room: this.state.currentRoom,
      user: this.props.user,
      text: message,
    });
  };


  handleUserClick = (userId) => {
    this.setState({
      currentRoom: `${userId}`
    });
    this.socket.emit('join channel', userId);
    console.log(this.state.currentRoom);
  };

  
  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Start Chatting!</h1>
          <div className="col">
            <ChatBox messages={this.state.messages} />
          </div>
          <div className="col">
            <UserList users={this.state.users} onUserClick={this.handleUserClick} />
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
}

export default ChatWindow


