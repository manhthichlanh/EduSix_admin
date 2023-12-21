import axios from "axios";

const serverEndpoint = 'http://14.225.198.206:8080/';

const ServerApi = axios.create({
  baseURL: serverEndpoint
})
export { ServerApi, serverEndpoint };
