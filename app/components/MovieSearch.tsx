"use client";
import { useState } from 'react';
import { searchMovies } from '../services/movie';
import MovieCard from "./MovieCard";
import SearchBar from './SearchBar';

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string; // Fixed property name
}

const MovieSearch = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const handleSearch = async (query: string) => {
        const results = await searchMovies(query);
        setMovies(results);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8'>
                {movies.map((movie) => (
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
