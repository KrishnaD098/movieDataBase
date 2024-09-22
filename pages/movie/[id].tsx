import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

interface Movie {
  id: string;
  title: string;
  description: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div style={{ color: 'white' }}>Loading...</div>;
  }

  return (
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
          marginBottom: '20px',
          boxShadow: 'none' // Remove any shadow to eliminate the white border
        }}
      />
      <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
        <strong>Rating:</strong> {movie.vote_average} / 10
      </p>
      <p style={{ fontSize: '1.1rem', maxWidth: '800px', textAlign: 'center' }}>
        {movie.description}
      </p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const res = await fetch(`https://api.themoviedb.org/3/movie/${params?.id}?api_key=e6a18dc27992aa9e445962d6156a6057`);
  const movie = await res.json();

  return {
    props: {
      movie: {
        ...movie,
        description: movie.overview,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e6a18dc27992aa9e445962d6156a6057`);
  const movies = await res.json();

  const paths = movies.results.map((movie: Movie) => ({
    params: { id: movie.id.toString() },
  }));

  return { paths, fallback: true };
};

export default MovieDetails;
