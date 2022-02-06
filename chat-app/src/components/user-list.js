import React from "react";

class UserList extends React.Component {
  render() {
    return (
      <div>
        <h2> User List</h2>
        <ul class="list-group">
        {this.props.users.map((user) => {
          return(
            <li class="list-group-item" key={user.id}>
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