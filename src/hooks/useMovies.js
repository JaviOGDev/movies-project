import { useCallback, useState, useRef, useMemo } from "react";
import searchMovies from "../services/movies";

function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async (search) => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;

      const newMovies = await searchMovies({ search });

      setMovies(newMovies);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, loading, getMovies };
}

export default useMovies;
