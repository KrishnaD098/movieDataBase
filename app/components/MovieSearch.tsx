"use client";
import { useState, useEffect } from 'react';
import { searchMovies } from '../services/movie';
import MovieCard from "./MovieCard";
import SearchBar from './SearchBar';

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from localStorage when the component mounts
  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearch = async (query: string) => {
    if (!query) return;

    const results = await searchMovies(query);
    setMovies(results);

    // Update search history
    const updatedHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10); // Limit to 10
    setSearchHistory(updatedHistory);

    // Store updated history in localStorage
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {/* Display search history */}
      {searchHistory.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Previous Searches</h3>
          <ul>
            {searchHistory.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSearch(item)} // Allow clicking to search again
                className="cursor-pointer text-blue-500 hover:underline"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8'>
        {movies.map((movie: any) => (
          <MovieCard 
            key={movie.id} 
            title={movie.title} 
            overview={movie.overview} 
            posterPath={movie.poster_path} 
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
