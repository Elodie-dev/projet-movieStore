import http from "./httpService";

const apiEndPoint = "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}
function newMovieUrl() {
  return `${apiEndPoint}/new`;
}
function updateMovieUrl(id) {
  return `${apiEndPoint}/update/${id}`;
}
function deleteMovieUrl(id) {
  return `${apiEndPoint}/delete/${id}`;
}

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function deleteMovies(movieId) {
  return http.delete(deleteMovieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie.movie_id) {
    const body = { ...movie };
    delete body._id;
    return http.put(updateMovieUrl(movie.movie_id), body);
  }

  return http.post(newMovieUrl, movie);
}
