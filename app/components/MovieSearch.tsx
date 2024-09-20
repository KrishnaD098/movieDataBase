"use client";
import { useState, useEffect } from 'react';
import { searchMovies } from '../services/movie';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

// Define the shape of a movie object
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const MovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Ensure Movie[] is used here
  const [searchHistory, setsearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setsearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearch = async (query: string) => {
    const results: Movie[] = await searchMovies(query); // Assuming searchMovies returns Movie[]
    setMovies(results);

    const updatedHistory = [
      query, 
      ...searchHistory.filter(item => item.toLowerCase() !== query.toLowerCase())
    ].slice(0, 10);
    setsearchHistory(updatedHistory);

    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="flex flex-col items-center">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-4">
        {movies.map((movie: Movie) => (
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
