import React from "react";

export default class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      showError: '',
      username: null,
      password: null,
    }
  }

  registerUser = (credentials) => {
    return fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => {
      if (data.status === 409) {
        this.setState({
          showError: "Username already exists!",
      })} else {
        return fetch('http://localhost:3001/login', {
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        .then(data => data.text())
      }
    })
  }
  

  handleSubmit = async (event) => {
    event.preventDefault();
    const token = await this.registerUser({
      username: this.state.username,
      password: this.state.password,
    });
    if (token) {
      this.props.setUser(token, this.state.username)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={event => this.setState({ username: event.target.value })}>
        </input>
        <input type="password" onChange={event => this.setState({ password: event.target.value })}>
        </input>
        <button type="submit">Submit</button>
        <p>{this.state.showError}</p>
      </form>
    )
  }
}



