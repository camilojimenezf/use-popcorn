import { useEffect, useState } from "react";

export function useMovies (query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const movies = await res.json();

        if (movies.Response === "False") throw new Error("Movie not found");

        setMovies(movies.Search);
        setError("")
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    // handleCloseMovie()
    fetchMovies();

    return () => {
      controller.abort();
    }
  }, [query]);

  return {
    movies,
    error,
    isLoading,
  }
}
