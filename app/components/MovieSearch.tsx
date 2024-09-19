import { useState } from 'react';
import { searchMovies } from '../services/movie';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query: string) => {
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <div className="flex flex-col items-center">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-4">
        {movies.map((movie: any) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            posterPath={movie.poster_path} // fixed typo here
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
