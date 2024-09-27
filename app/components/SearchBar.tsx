import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Head from "next/head";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load search history from localStorage on initial render
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
          setSearchHistory(parsedHistory);
        }
      } catch (error) {
        console.error("Error parsing search history from localStorage:", error);
      }
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) return;

    // Update search history, avoiding duplicates
    setSearchHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter(
        (item) => item.toLowerCase() !== trimmedQuery
      );
      updatedHistory.unshift(trimmedQuery); // Add the new search at the top
      return updatedHistory.slice(0, 10); // Keep only the latest 10 searches
    });

    onSearch(trimmedQuery);
    setQuery(""); // Clear the search bar after search
    setShowHistory(false); // Hide history on search
  };

  const handleRemove = (item: string) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter(
        (search) => search.toLowerCase() !== item.toLowerCase()
      )
    );
  };

  const handleSearchClick = (item: string) => {
    setQuery(item);
    onSearch(item);
    setShowHistory(false); // Hide history after selection
  };

  return (
    <div className="relative w-screen max-w-3xl">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <input
          type="text"
          className="border-gray-300 rounded-l py-2 px-4 w-full focus:outline-none focus:border-blue-500"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowHistory(true)}
          placeholder="Search movies..."
        />
        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-6 rounded-r hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </form>

      {showHistory && searchHistory.length > 0 && (
        <ul className="absolute z-10 left-0 w-full bg-black border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
          {searchHistory.map((item) => (
            <li
              key={item}
              className="flex justify-between items-center py-1 px-2 hover:bg-gray-700 text-white cursor-pointer w-full"
              onClick={() => handleSearchClick(item)}
            >
              <span>{item}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering search when removing
                  handleRemove(item);
                }}
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
