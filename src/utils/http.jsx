import axios from "axios";
const ServerApi = axios.create({
  baseURL: 'http://localhost:8080/'
})
const binanceApi = axios.create({
  baseURL: 'https://api.binance.com/api/v3',
});
const cexApi = axios.create({
  baseURL: 'https://api.plus.cex.io/rest-public',
})
export { ServerApi, binanceApi, cexApi };