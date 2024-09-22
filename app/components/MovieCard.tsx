import Link from 'next/link';

interface MovieCardProps {
  id: number;  
  title: string;
  overview: string;
  posterPath: string;
}

const MovieCard = ({ id, title, overview, posterPath }: MovieCardProps) => {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '/no-image-available.png';

  return (
    <Link href={`/movie/${id}`} passHref>
      <div className="bg-white rounded shadow p-4 cursor-pointer">
        <img
          className="w-full h-64 rounded mb-4"
          src={imageUrl}
          alt={title}
        />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-500">{overview.substring(0, 150)}...</p>
      </div>
    </Link>
  );
};

export default MovieCard;
