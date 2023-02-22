const API_KEY = "4287ad07";

async function searchMovies({ search }) {
  if (!search) return;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );
    const json = await response.json();

    const movies = json.Search;

    return movies;
  } catch (e) {
    throw new Error("Error searching movies");
  }
}

export default searchMovies;
