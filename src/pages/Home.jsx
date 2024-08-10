import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Layout from "./Layout";
import { Link } from "react-router-dom";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/api/v3/coins/markets?vs_currency=usd&per_page=10", {
        headers: {
          "x-cg-demo-api-key": process.env.REACT_APP_GECKO_API_KEY,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

  return (
    <Layout>
      {error && <p>There was an error: {error.message}</p>}
      <div className="crypto-container">
        {data &&
          data.map((coin, index) => {
            return (
              <Link to={`/coin/${coin.id}`} className="coin-card" key={index}>
                <div className="coin-header">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="coin-image"
                  />
                  <h1 className="coin-name">{coin.name}</h1>
                  <h2 className="coin-symbol">{coin.symbol.toUpperCase()}</h2>
                </div>
                <div className="coin-details">
                  <p className="coin-price">
                    Price: ${coin.current_price.toFixed(2)}
                  </p>
                  <p className="coin-market-cap">
                    Market Cap: ${coin.market_cap.toLocaleString()}
                  </p>
                  <p className="coin-volume">
                    Volume: ${coin.total_volume.toLocaleString()}
                  </p>
                  <p
                    className={`coin-change ${
                      coin.price_change_percentage_24h >= 0
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </Layout>
  );
};

export default Home;
