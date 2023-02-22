import "./App.css";
import Movies from "./components/Movies";
import useSearch from "./hooks/useSearch";
import useMovies from "./hooks/useMovies";
import { useCallback, useState } from "react";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies(search);
    }, 2000),
    [getMovies]
  );

  const handleChange = (event) => {
    const newSearch = event.target.value;
    if (newSearch.startsWith(" ")) return; //Evita empezar con un espacio
    setSearch(newSearch);

    debouncedGetMovies(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSubmbit = (event) => {
    event.preventDefault();
    getMovies(search);
  };

  return (
    <div className="page">
      <header>
        <form className="form" onSubmit={handleSubmbit}>
          <input
            value={search}
            onChange={handleChange}
            name={"query"}
            placeholder="Avengers, Matrix, ..."
          ></input>
          <input type={"checkbox"} onChange={handleSort} checked={sort} />
          <button type="submit">Busqueda</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>
      <main>
        {loading && <h1>Loading...</h1>}

        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
