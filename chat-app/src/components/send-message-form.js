import React from "react";

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});

  }

  handleSubmit = (event) => {
    console.log('adding new message... ')
    this.props.onNewMessage(this.state.value);
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

export default SendMessageForm