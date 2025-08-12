import React, { useState } from "react";
import api from "../services/api";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await api.get(`/products?name=${value}`);
      setResults(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200); // Чтобы дать время на клик
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={handleBlur}
        placeholder="Search..."
        className="px-4 py-2 w-64 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
      {showDropdown && (
        <ul
          className={`absolute left-0 w-full bg-white border rounded-md mt-2 overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform ${
            showDropdown ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {results.length > 0 ? (
            results.map((result) => (
              <li
                key={result.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => setSearchTerm(result.name)}
              >
                {result.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
