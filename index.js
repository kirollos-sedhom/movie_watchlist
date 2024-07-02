const myKey = "346c7a0c";
const searchBtn = document.getElementById("search");
const moviesPlaceHolder = document.getElementById("placeholder");
const searchBox = document.getElementById("searchbox");
const addToWatchlistBtn = document.getElementById("add-to-watchlist");
const textElement = document.getElementById("movie__plot"); // Replace with actual ID
const readMoreButton = document.createElement("a");
// let watchlist = []
readMoreButton.textContent = "Read More";
import { isInWatchlist, addToLocalStorageWatchlist, getWatchlist, saveWatchlist, getMovieDetails,removeFromLocalStorageWatchList } from "./localStorageFunctions.js";
// Check if the content overflows the element's height
// if (textElement.scrollHeight > textElement.clientHeight) {
//     // Add "Read More" button and truncate the text
//     textElement.textContent = textElement.textContent.substring(0, 100) + "..."; // Adjust length as needed
//     textElement.appendChild(readMoreButton);
// }



searchBtn.addEventListener("click", handleSearchBtn)
document.addEventListener('click', function(e){
  const target = e.target.closest('[data-add]');
  if(target){

    const movieId = target.dataset.add;

    if (!isInWatchlist(movieId)) {
      console.log("adding to watchList")
      addToWatchlist(target, movieId);

    }
    else{
      console.log("removing from watchlist")
      removeFromWatchlist(target,movieId)
    }
  }
});
function handleSearchBtn(e)
{
  e.preventDefault()
  // const returned = searchForMovie(searchBox.value)
  // moviesPlaceHolder.innerText = returned
  searchForMovie(searchBox.value)

}



function addToWatchlist(element, movieId) {
  console.log(movieId)
  addToLocalStorageWatchlist(movieId)
  element.innerHTML = `
  <i class="fa-solid fa-circle-minus"></i> <p>Remove</p>
  `
}

function removeFromWatchlist(element, movieId) {
  console.log(movieId)
  removeFromLocalStorageWatchList(movieId)
  element.innerHTML = `
<i class="fa-solid fa-circle-plus"></i> <p>Watchlist</p>
  `
}










async function searchForMovie(title)
{
  // returns array of results
  const res = await fetch(`https://www.omdbapi.com/?s=${title}&page=1&apikey=346c7a0c`)
  const data = await res.json()
  const moviesArray = getArrayOfMovies(data)
  let newHTML = ``
  if (!moviesArray) {
    // alert("found no movies")
    newHTML = `
    <div class="movie-not-found">
    <p>
       error 404: movie not found
    </p>
 
    </div>
    `

    moviesPlaceHolder.innerHTML = newHTML
  }
  else
  {
    moviesArray.forEach(
      movie=>{
        // console.log(movie)
        getMovieDetails(movie.imdbID)
        .then(movieDetails => {
          console.log(movieDetails)
          newHTML += 
          `
          <div class="movie" id=${movie.imdbID}>
          <img class="movie__poster" src=${movie.Poster} />
          <div class="movie__details">
              <p class="movie__title">${movie.Title}
                  <span class="movie__rating">
                  <i class="fa-solid fa-star star"></i>
                   ${movieDetails.imdbRating}
                  </span>
              </p>
              <div class="movie__genres">
                  <p>${movieDetails.Runtime}</p>
                  <p>${movieDetails.Genre}</p>
                  <span data-add="${movie.imdbID}">
                      ${!isInWatchlist(movie.imdbID)? `<i class="fa-solid fa-circle-plus"></i> <p>Watchlist</p>` :   `<i class="fa-solid fa-circle-minus"></i> <p>Remove</p>` }
                      
                      
                  </span>
              </div>
              <p class="movie__plot" id="movie__plot">${movieDetails.Plot}<a>see more</a></p>
          </div>
  </div>
  <hr>
        
          `
          moviesPlaceHolder.innerHTML = newHTML
          // console.log(movieDetails.Plot)
        })
        .catch(error => {
          console.error("Error fetching movie details:", error);
        });
      
      }
    )

    // const addToWatchlistBtn = document.getElementById("add-to-watchlist");
    // addToWatchlistBtn.addEventListener("click", addToWatchlist)
  }
  
// Genre: "Action, Adventure, Sci-Fi"
// Plot: "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races."
// Runtime: "123 min"
// imdbRating: "6.8"

  



  // console.log(firstMovie)
  // example output:
  // Poster: "img.jpg"
  // Title: "Captain Marvel"
  // Type:"movie"
  // Year: "2019"
  // imdbID: "tt4154664"


}





function getArrayOfMovies(data){
  return data.Search
}
function destructMovie(movie){
  return {
    title: movie.Title,
    poster: movie.Poster,
    year: movie.Year
  }
}



console.log(isInWatchlist("tt4154664"))