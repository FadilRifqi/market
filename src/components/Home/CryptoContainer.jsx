import React from "react";
import { Link } from "react-router-dom";

const CryptoContainer = ({
  data,
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  setCurrentPage,
}) => {
  return (
    <>
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
                  <p className="coin-price">Price: ${coin.current_price}</p>
                  <p className="coin-market-cap">
                    Market Cap: $
                    {coin.market_cap && coin.market_cap.toLocaleString()}
                  </p>
                  <p className="coin-volume">
                    Volume: $
                    {coin.total_volume && coin.total_volume.toLocaleString()}
                  </p>
                  {coin.price_change_percentage_24h && (
                    <p
                      className={`coin-change ${
                        coin.price_change_percentage_24h >= 0
                          ? "positive"
                          : "negative"
                      }`}
                    >
                      24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            currentPage === 1
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {currentPage > 4 && (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-600"
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-600"
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-600"
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <span className="text-lg font-semibold">...</span>
          </>
        )}
        <span className="text-lg font-semibold mx-2">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages - 3 && (
          <>
            <span className="text-lg font-semibold">...</span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-600"
              onClick={() => setCurrentPage(totalPages - 2)}
            >
              {totalPages - 2}
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-600"
              onClick={() => setCurrentPage(totalPages - 1)}
            >
              {totalPages - 1}
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-600"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            currentPage === totalPages
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CryptoContainer;
