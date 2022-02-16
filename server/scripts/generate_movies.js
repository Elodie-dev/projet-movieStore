import MoviesRaw from  "./movies.js";
import XMLHttpRequest from "xhr2";
const URL = "http://localhost:3080/new/movie";

//Générer une quantité aléatoire
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Générer un prix aléatoire
function getRandomFloat(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.random() * (max - min) + min;
  return Number(result.toFixed(2));
}

const TAGS = {
  Adventure: 1,
  Drama: 5,
  Romance: 2,
  Comedy: 6,
  Short: 3,
  Western: 4,
  Biography: 7,
  History: 8,
  Musical: 9,
  Thriller: 10,
  Action: 11,
  Fantasy: 12,
  Family: 13,
  Documentary: 14,
  War: 15,
  Horror: 16,
  "Sci-Fi": 17,
  Animation: 18,
  Music: 19,
  Sport: 20,
  Crime: 21,
  "Film-Noir": 22,
  Mystery: 23,
  "Talk-Show": 24,
  News: 25,
};

// Créer requete d'ajout movie dans la BDD
function CREATE_REQUEST(movie) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", URL);
    xhr.setRequestHeader("content-type", "application/json");
    const data = JSON.stringify(movie);
    xhr.send(data);
    console.log(`Film ${movie.title} ajouté !`);
    resolve(data);
  });
}

function formatMovie(movie) {
  let dataIsMissing = false;

  const tag = Array.isArray(movie.genres)
    ? TAGS[movie.genres[0]]
    : TAGS[movie.genres];
  const releaseDate = movie.released ? movie.released.$date : undefined;
  const rating = movie.imdb ? movie.imdb.rating : undefined;

  const newMovie = {
    title: movie.title,
    description: movie.fullplot,
    released_at: releaseDate,
    duration: movie.runtime,
    tag_id: tag,
    rating: rating,
    image: movie.poster,
    stock: getRandomInt(5, 20),
    price: getRandomFloat(9.99, 19.99),
  };

  for (let key in newMovie) {
    if (
      newMovie[key] === undefined ||
      typeof newMovie.released_at !== "string"
    ) {
      dataIsMissing = true;
      break;
    }
  }

  if (dataIsMissing) {
    console.log(`Data is missing for movie: ${movie.title}`);
  } else return newMovie;
}

const requests = [];

for (const movie of MoviesRaw) {
  const newMovie = formatMovie(movie);
  if (newMovie) {
    requests.push(CREATE_REQUEST(newMovie));
  }
}

Promise.all(requests).then(() => {
  console.log("All movies posted !");
});

