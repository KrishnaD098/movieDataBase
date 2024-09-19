import Head from "next/head";
import MovieSearch from "./components/MovieSearch";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Head>
        <title>Movie Database</title>
        <meta name="description" content="A simple movie database" />
      </Head>

      <div className="container mx-auto py-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 text-white">Movie Database</h1>
        <MovieSearch />
      </div>
    </main>
  );
}
