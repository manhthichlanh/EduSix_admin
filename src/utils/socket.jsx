import { io } from "socket.io-client";
import { serverEndpoint } from "./http";
// const socket = io('localhost:3000/');
const socket = io(serverEndpoint);

export default socket;