import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({
  showSearch,
  searchQuery,
  handleSearchChange,
  handleKeyDown,
  handleIconClick,
  setShowSearch,
}) => {
  const inputRef = useRef(null);

  return (
    <div className="relative">
      {showSearch ? (
        <input
          type="text"
          placeholder="Search for a coin..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setShowSearch(false)}
          ref={inputRef} // Attach ref to input
          className="absolute top-0 left-0 w-100 p-2 border border-gray-300 rounded"
        />
      ) : (
        <FaSearch
          onClick={() => {
            handleIconClick();
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          style={{ cursor: "pointer" }}
          className="absolute top-0 left-0"
        />
      )}
    </div>
  );
};

export default SearchInput;
