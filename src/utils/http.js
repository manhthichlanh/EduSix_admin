import axios from "axios";

const serverEndpoint = 'http://localhost:8080';

const ServerApi = axios.create({
  baseURL: serverEndpoint
})
export { ServerApi, serverEndpoint };
