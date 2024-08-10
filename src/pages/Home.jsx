import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { fetchCoinMarkets } from "../services/coinGeckoServices";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const perPage = 10;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchCoinMarkets("usd", perPage, currentPage);
        setData(data);
        setTotalPages(Math.ceil(100 / perPage)); // Assuming there are 100 items in total
        console.log(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [currentPage]);

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (!data.length) {
    return <div className="text-center">No data available</div>;
  }

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
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 disabled:bg-gray-400"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2 disabled:bg-gray-400"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default Home;
