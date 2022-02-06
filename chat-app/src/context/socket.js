import React from "react";
import { io } from "socket.io-client";
const SERVER = "http://127.0.0.1:3001";

export const socket = io(SERVER, { transports: ['websocket'] });
export const SocketContext = React.createContext();