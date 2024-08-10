import axios from "axios";

const API_KEY = process.env.REACT_APP_GECKO_API_KEY;
const BASE_URL = "/api/api/v3";

export const fetchCoinMarkets = async (
  vsCurrency = "usd",
  perPage = 10,
  currentPage
) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: vsCurrency,
        per_page: perPage,
        page: currentPage,
      },
      headers: {
        "x-cg-demo-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
