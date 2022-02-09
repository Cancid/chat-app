import React from "react";

class UserList extends React.Component {

  handleClick = (event) => {
    console.log(event.target)
    this.props.onUserClick(event.target.getAttribute('value'))
  }

  render() {
    return (
      <div>
        <h2> User List</h2>
        <ul className="list-group">
        {this.props.users.map((user) => {
          return(
            <li className="list-group-item" value={user.userId}  key={user.userId} onClick={this.handleClick}>
              {user.user}
            </li>
          );
        })} 
        </ul>
      </div>
    );
  }
}

export default UserList