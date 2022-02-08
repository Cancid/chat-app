import React from 'react';

class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  loginUser = (credentials) => {
    return fetch('http://localhost:3001/login', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.text())
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const token = await this.loginUser({
      username: this.state.username,
      password: this.state.password,
    });
    console.log(token)
    this.props.setUser(token, this.state.username)
  }

  render() {
   return (
     <form onSubmit={this.handleSubmit}>
       <input type="text" onChange={event => this.setState({ username: event.target.value })}>
       </input>
       <input type="password" onChange={event => this.setState({ password: event.target.value })}>
       </input>
       <button type="submit">Submit</button>
     </form>
   )
 }
}

export default Login