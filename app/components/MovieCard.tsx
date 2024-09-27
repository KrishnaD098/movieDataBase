import Link from 'next/link';
import Image from 'next/image'; 

interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
}

const MovieCard = ({ id, title, overview, posterPath }: MovieCardProps) => {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '/no-image-available.png'; // Ensure this image exists in your public folder

  return (
    <Link href={`/movies/${id}`}>
      <div className="bg-white rounded shadow p-4 cursor-pointer">
        <div className="relative w-full h-64 mb-4">
          <Image
            className="rounded"
            src={imageUrl}
            alt={`${title} poster`} // Updated alt attribute
            layout="fill" 
            objectFit="cover" 
            priority={true} 
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-500">{overview.substring(0, 150)}...</p>
      </div>
    </Link>
  );
};

export default MovieCard;
