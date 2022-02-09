import React from 'react';
import './App.css';
import ChatWindow from './components/chat-window';
import Login from './components/login/login';


export default class App extends React.Component {

  getUser = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  }

  constructor() {
    super();
    const userToken = this.getUser()
    this.state = {
      token: userToken?.token,
      user: userToken?.user,
    };
  }

  setUser = (userToken, username) => {
    console.log(userToken)
    let data = JSON.stringify({ token: userToken, "user": username })
    sessionStorage.setItem('token', data);
    // console.log(userToken)
    this.setState({
      token: userToken,
      user: username,
    });
  }

  render() {
    if (!this.state.token) {
      return <Login setUser={this.setUser} />
    }
    return (
        <div className="App">
          <ChatWindow user={this.state.user}/>
        </div>
    );
  } 
}

