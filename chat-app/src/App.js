import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ChatWindow from './components/chat-window';
import Login from './components/login/login';
import { SocketContext, socket } from './context/socket';



export default class App extends React.Component {

  getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  }

  constructor() {
    super();
    this.state = {
      token: this.getToken(),
      user: 'Test',
    };
  }

  setUser = (userToken, username) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    this.setState({
      token: this.getToken(),
      user: username,
    });
  }

  render() {
    if (!this.state.token) {
      return <Login setUser={this.setUser} />
    }
    return (
      <SocketContext.Provider value={socket}>
        <div className="App">
          <ChatWindow user={this.state.user}/>
        </div>
      </SocketContext.Provider>
    );
  } 
}

