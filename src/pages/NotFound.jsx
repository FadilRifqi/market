import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Helmet>
        <title>Crypto | 404</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 inline-block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
