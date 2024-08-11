import React, { useEffect, useRef, useState, useCallback } from "react";
import Layout from "./Layout";
import { Helmet } from "react-helmet";
import {
  fetchCoinMarkets,
  fetchCoinQuery,
} from "../services/coinGeckoServices";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchInput from "../components/Home/SearchInput.jsx";
import CryptoContainer from "../components/Home/CryptoContainer.jsx";

const Home = () => {
  const inputRef = useRef(null);
  const [data, setData] = useState([]);
  const [ids, setIds] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("currentPage")) || 1
  );
  const [totalPages, setTotalPages] = useState(100);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const perPage = 10;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCoinMarkets("usd", perPage, currentPage, ids);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, ids]);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    fetchData();
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage, ids, fetchData]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchHandler = async () => {
    try {
      const data = await fetchCoinQuery(searchQuery);
      if (data) {
        const newIds = data.coins.slice().map((coin) => coin.id); // Take first 10 coin ids
        setIds(newIds.join(",")); // Overwrite previous ids with new ids
        if (data.coins.length <= 1) {
          setTotalPages(100);
          return;
        }
        setTotalPages(Math.ceil(data.coins.length / perPage));
      }
    } catch (error) {
      console.error("Error searching coins:", error);
      setError(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchHandler();
    }
  };

  const handleIconClick = () => {
    setShowSearch(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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
      <Helmet>
        <title>Crypto | Coins</title>
      </Helmet>
      <div className="relative">
        <SearchInput
          showSearch={showSearch}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleKeyDown={handleKeyDown}
          handleIconClick={handleIconClick}
          setShowSearch={setShowSearch}
        />
        <CryptoContainer
          data={data}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Layout>
  );
};

export default Home;
