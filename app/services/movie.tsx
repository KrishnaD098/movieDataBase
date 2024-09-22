import axios from 'axios';

const API_KEY = "e6a18dc27992aa9e445962d6156a6057";
const API_BASE_URL = 'https://api.themoviedb.org/3';

const client = axios.create({
    baseURL: API_BASE_URL,
    params: { api_key: API_KEY }
});

// Existing searchMovies function
export const searchMovies = async (query: string) => {
    try {
        const response = await client.get("/search/movie", {
            params: { query },
        });

        console.log(response.data); // Log API response

        if (response.data && response.data.results) {
            return response.data.results;
        } else {
            console.error("Couldn't get the data");
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};

// New getMovieDetails function to fetch specific movie details
export const getMovieDetails = async (id: string | string[] | undefined) => {
    try {
        const response = await client.get(`/movie/${id}`); // Fetch movie details based on ID
        return response.data; // Return the movie data
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null; // Return null if there's an error
    }
};
