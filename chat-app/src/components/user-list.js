import React from "react";

class UserList extends React.Component {
  render() {
    return (
      <div>
        <h2> User List</h2>
        <ul class="list-group">
          <li class="list-group-item" key={'test'}>Test</li>
        </ul>
      </div>
    );
  }
}

export default UserList