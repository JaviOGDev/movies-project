function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title}></img>
        </li>
      ))}
    </ul>
  );
}

function NoMovies() {
  return <p>There are no movies</p>;
}

function Movies({ movies }) {
  const hastMovies = movies?.length > 0;

  return hastMovies ? <ListOfMovies movies={movies} /> : <NoMovies />;
}

export default Movies;
