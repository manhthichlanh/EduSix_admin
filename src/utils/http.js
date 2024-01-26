import axios from "axios";

<<<<<<< HEAD
const serverEndpoint = 'http://localhost:8080';
=======
const serverEndpoint = 'http://localhost:8080/';
>>>>>>> 46cf3c01681a21ff0f7cb570f1af14b66b30dcf4

const ServerApi = axios.create({
  baseURL: serverEndpoint
})
export { ServerApi, serverEndpoint };
