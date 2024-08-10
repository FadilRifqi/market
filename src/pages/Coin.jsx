import axios from "axios";
import React, { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import Chart from "react-apexcharts";
import LoadingSpinner from "../components/LoadingSpinner";

const customParser = (htmlString) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name === "a") {
        return (
          <a href={domNode.attribs.href} style={{ color: "blue" }}>
            {domToReact(domNode.children)}
          </a>
        );
      }
    },
  };
  return parse(htmlString, options);
};

function Coin() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [ohlcSeries, setOhlcSeries] = useState([{ name: "OHLC", data: [] }]);

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

    const fetchOhlcData = async () => {
      try {
        const response = await axios.get(`/api/api/v3/coins/${id}/ohlc`, {
          params: {
            vs_currency: "usd",
            days: "180", // Data historis 6 bulan (180 hari)
          },
          headers: {
            "x-cg-demo-api-key": process.env.REACT_APP_GECKO_API_KEY,
          },
        });

        const ohlcData = response.data.map((ohlc) => ({
          x: new Date(ohlc[0]),
          y: [ohlc[1], ohlc[2], ohlc[3], ohlc[4]], // [Open, High, Low, Close]
        }));

        setOhlcSeries([{ name: "OHLC", data: ohlcData }]);
      } catch (error) {
        console.error("API Error:", error); // Log error API
        setError(error);
      }
    };

    fetchOhlcData();
  }, [id]);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (!data) {
    return <LoadingSpinner />;
  }

  const options = {
    chart: {
      height: 350,
      type: "candlestick",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: true,
        tools: {
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
        },
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 1,
    },
    grid: {
      borderColor: "#40475D",
    },
    xaxis: {
      type: "datetime",
      axisTicks: {
        color: "#333",
      },
      axisBorder: {
        color: "#333",
      },
    },
    yaxis: {
      decimalsInFloat: 2,
      opposite: true,
      labels: {
        offsetX: -10,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        formatter: function (val) {
          return new Date(val).toLocaleDateString();
        },
      },
    },
    colors: ["#FCCF31"],
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#F55555"],
        stops: [0, 100],
      },
    },
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6 min-h-screen">
          <div className="flex items-center mb-6 ">
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
              <div className="bg-gray-100 p-4 rounded-lg h-40">
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
              <div className="bg-gray-100 p-4 h-40 rounded-lg overflow-y-auto">
                <p className="text-justify">
                  {customParser(data.description.en)}
                </p>
              </div>
            </div>
          </div>
          {/* Candle Stick Chart */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">Candlestick Chart</h2>
            {ohlcSeries[0].data.length > 0 ? (
              <Chart
                options={options}
                series={ohlcSeries}
                type="candlestick"
                height={350}
              />
            ) : (
              <p>Loading Candlestick Chart...</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Coin;
