"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { searchMovies } from "../services/movie";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

// Define the shape of a movie object
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const MovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [cachedMovies, setCachedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    const cachedData = sessionStorage.getItem("cachedMovies");

    if (storedHistory) setSearchHistory(JSON.parse(storedHistory));
    if (cachedData) setCachedMovies(JSON.parse(cachedData)); // Restore cached data
  }, []);

  const handleSearch = async (query: string) => {
    const results: Movie[] = await searchMovies(query);
    setMovies(results);

    const updatedHistory = [
      query,
      ...searchHistory.filter(
        (item) => item.toLowerCase() !== query.toLowerCase()
      ),
    ].slice(0, 10);

    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    sessionStorage.setItem("cachedMovies", JSON.stringify(results)); // Cache results
  };

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Movie Search Database</title>
        <meta name="description" content="Find and search for movies easily." />
      </Head>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-4">
        {(movies.length ? movies : cachedMovies).map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
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
