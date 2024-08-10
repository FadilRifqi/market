import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

function Coin() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/api/v3/coins/${id}`, {
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
  }, [id]);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (!data) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6 min-h-screen">
          <div className="flex items-center mb-6">
            <img
              src={data.image.large}
              alt={data.name}
              className="w-20 h-20 mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold">{data.name}</h1>
              <p className="text-gray-600 uppercase">{data.symbol}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Market Data</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="mb-2">
                  <span className="font-semibold">Current Price:</span> $
                  {data.market_data.current_price.usd}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Market Cap:</span> $
                  {data.market_data.market_cap.usd.toLocaleString()}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">24h High:</span> $
                  {data.market_data.high_24h.usd}
                </p>
                <p>
                  <span className="font-semibold">24h Low:</span> $
                  {data.market_data.low_24h.usd}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-justify">
                  {showFullDescription ? (
                    <>
                      {data.description.en}
                      <button
                        onClick={() => setShowFullDescription(false)}
                        className="text-blue-500 ml-2"
                      >
                        Show Less
                      </button>
                    </>
                  ) : (
                    <>
                      {data.description.en.substring(0, 300)}...
                      <button
                        onClick={() => setShowFullDescription(true)}
                        className="text-blue-500 ml-2"
                      >
                        Read More
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Coin;
