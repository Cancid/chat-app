import logo from './logo.svg';
import './App.css';
import ChatWindow from './components/chat-window';
import socketClient  from "socket.io-client";
const SERVER = "http://127.0.0.1:3001";

function App() {
  const socket = socketClient(SERVER);
  return (
    <div className="App">
      <ChatWindow />
    </div>
  );
}

export default App;
