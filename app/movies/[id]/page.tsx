"use client"; // Make this a client component

import { useEffect, useState } from 'react';
import Head from 'next/head'; 

interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function MovieDetails({ params }: { params: { id: string } }) {
  const { id } = params; // Access id from params directly
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e6a18dc27992aa9e445962d6156a6057`);
      const data = await res.json();
      setMovie(data);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return null;
  }

  return (
    <>
      {/* Add SEO tags dynamically based on movie details */}
      <Head>
        <title>{movie.title} - Movie Database</title>
        <meta name="description" content={movie.overview} />
        <meta name="keywords" content={`${movie.title}, movie, ${movie.release_date}, rating ${movie.vote_average}`} />
        <meta name="author" content="Movie Database" />

        {/* Open Graph (OG) tags for social sharing */}
        <meta property="og:title" content={movie.title} />
        <meta property="og:description" content={movie.overview} />
        <meta property="og:image" content={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        <meta property="og:url" content={`https://movie-data-base-go5q-gamma.vercel.app/${movie.id}`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags for Twitter sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={movie.title} />
        <meta name="twitter:description" content={movie.overview} />
        <meta name="twitter:image" content={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      </Head>

      <div style={{ 
        backgroundColor: 'black', 
        color: 'white', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '20px' 
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ 
            width: '300px', 
            borderRadius: '8px', 
            marginBottom: '20px'
          }}
        />
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
          <strong>Rating:</strong> {movie.vote_average} / 10
        </p>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', textAlign: 'center' }}>
          {movie.overview}
        </p>
      </div>
    </>
  );
}
