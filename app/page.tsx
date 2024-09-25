import Head from "next/head";
import MovieSearch from "./components/MovieSearch";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Head>
        {/* SEO: Improved Title */}
        <title>Movie Database | Search and Explore Movies</title>
        
        {/* SEO: Descriptive Meta Description */}
        <meta
          name="description"
          content="Discover and explore movies in our database. Search for your favorite films, get detailed information, ratings, and more."
        />

        {/* SEO: Keywords */}
        <meta
          name="keywords"
          content="movies, movie database, search movies, movie ratings, movie information, film discovery"
        />

        {/* Open Graph: For better social media previews */}
        <meta property="og:title" content="Movie Database | Search and Explore Movies" />
        <meta
          property="og:description"
          content="Explore a vast collection of movies with detailed information and ratings."
        />
        <meta property="og:image" content="/path/to/image.jpg" />
        <meta property="og:url" content="https://www.your-movie-database.com" />

        {/* Twitter Card: Social Sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Movie Database | Search and Explore Movies" />
        <meta
          name="twitter:description"
          content="Discover and search your favorite movies in our movie database."
        />
        <meta name="twitter:image" content="/path/to/image.jpg" />

        {/* Canonical URL: To prevent duplicate content issues */}
        <link rel="canonical" href="https://www.your-movie-database.com" />

        {/* Structured Data (JSON-LD): Helps Google understand your site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.your-movie-database.com",
              "name": "Movie Database",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.your-movie-database.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <div className="container mx-auto py-10 flex flex-col items-center justify-center">
        {/* Use descriptive H1 for the main title */}
        <h1 className="text-4xl font-bold mb-8 text-white">Discover Movies in Our Database</h1>
        
        {/* Movie search component */}
        <MovieSearch />
      </div>
    </main>
  );
}
