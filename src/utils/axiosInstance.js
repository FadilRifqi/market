// axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", // Replace with your API base URL
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin":
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    "X-CMC_PRO_API_KEY": "92090421-c2f0-4196-93bd-3e1016159bd3",
  },
});

export default axiosInstance;
