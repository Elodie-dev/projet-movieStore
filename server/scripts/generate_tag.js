import XMLHttpRequest from "xhr2";
const URL = "http://localhost:3080/new/tag";

const TAGS = [
  'Adventure',
  'Drama',
  'Romance',
  'Comedy',
  'Short',
  'Western',
  'Biography',
  'History',
  'Musical',
  'Thriller',
  'Action',
  'Fantasy',
  'Family',
  'Documentary',
  'War',
  'Horror',
  'Sci-Fi',
  'Animation',
  'Music',
  'Sport',
  'Crime',
  'Film-Noir',
  'Mystery',
  'Talk-Show',
  'News'
]
const promise = [];
for (const tag of TAGS) {
    promise.push(
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", URL)
            xhr.setRequestHeader("content-type", "application/json");    
            const data = JSON.stringify({name:tag});            
            xhr.send(data);
            console.log(`Tag ${tag} posted !`);
            resolve(data);
        }))
}
Promise.all(promise).then(() => {
    console.log("All tags posted !");
})

