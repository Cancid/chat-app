import React from "react";

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit = (event) => {
    console.log('adding new message... ')
    this.props.onNewMessage(this.state.value);
    this.setState({
      value: ""
    });
    event.preventDefault();
  }

  render() {
    return (
        <form className="row g-1 send-message" onSubmit={this.handleSubmit}>
          <div className="col-auto">
            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange}></input>
          </div>
          <div className="col-auto">
            <button type="submit" id="button-addon1" className="btn btn-primary">Send</button>
          </div>
        </form>
    );
  }
}

export default SendMessageForm