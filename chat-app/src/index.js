import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});

  }

  handleSubmit = (event) => {
    console.log(this.state.value)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
        <button type="submit">Send</button>
      </form>
    );
  }
}

class ChatBox extends React.Component {
  render() {
    return (
      <ul className="chatbox">
        {this.props.messages.map(message => {
          return(
            <li key={message.id}>
              <div>
                {message.user}
              </div>
              <div>
                {message.text}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }  
}

class UserList extends React.Component {
  render() {
    return (
      <div>
        <h2> User List</h2>
        <ul>
          <li key={'test'}>Test</li>
        </ul>
      </div>
    );
  }
}

class ChatWindow extends React.Component {
  
  constructor() {
    super()
    this.state = {
      messages: DUMMY_DATA
    }
  }

  render() {
    return (
      <div>
        <h1>Start Chatting!</h1>
        <ChatBox messages={this.state.messages} />
        <UserList />
        <SendMessageForm />
      </div>
    );
  }
}


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



ReactDOM.render(
  <ChatWindow />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

