import React from "react";

class ChatBox extends React.Component {
  render() {
    return (
      <ul class="list-group" className="chatbox">
        {this.props.messages.map(message => {
          return(
            <li class="list-group-item d-flex justify-content-between align-items-center" key={message.id}>
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
    );
  }  
}

export default ChatBox