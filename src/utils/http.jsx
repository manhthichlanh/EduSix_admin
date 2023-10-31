import axios from "axios";

const binanceApi = axios.create({
  baseURL: 'https://api.binance.com/api/v3',
});
const cexApi = axios.create({
  baseURL: 'https://api.plus.cex.io/rest-public',
})
const ServerApi = axios.create({
  baseURL: 'http://localhost:8080/'
})
export { binanceApi, cexApi, ServerApi };