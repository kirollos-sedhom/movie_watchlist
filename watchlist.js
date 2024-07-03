import { isInWatchlist, addToLocalStorageWatchlist, getWatchlist, saveWatchlist, getMovieDetails, removeFromLocalStorageWatchList } from "./localStorageFunctions.js";

// console.log(getWatchlist())
const mainBody = document.getElementById("movies-list")
document.addEventListener('click', function(e){
    const target = e.target.closest('[data-add]');
    if(target){
  
      const movieId = target.dataset.add;
        console.log("removing from watchlist")
        removeFromLocalStorageWatchList(movieId)
        window.location.reload();

    
    }
  });
  window.onload = ()=>{
    const watchlistMovies = getWatchlist()
    console.log(watchlistMovies)
    if (watchlistMovies.length === 0) {
        mainBody.innerHTML = `
                <div class="container">
                <p class="empty-list">Your watchlist is looking a little empty...</p>
                <a class="movies-page" href="./index.html"><p class="add-movies"><i class="fa-solid fa-circle-plus"></i> Let's add some movies!</p></a>
                
           
            </div>
        `
    }
    else{
        mainBody.innerHTML = ``
        watchlistMovies.forEach(movieId => {
            getMovieDetails(movieId).then(
                movieDetails =>{
                    mainBody.innerHTML += `
      <div class="movie" id=${movieId}>
      <img class="movie__poster" src=${movieDetails.Poster} />
      <div class="movie__details">
          <p class="movie__title">${movieDetails.Title}
              <span class="movie__rating">
              <i class="fa-solid fa-star star"></i>
               ${movieDetails.imdbRating}
              </span>
          </p>
          <div class="movie__genres">
              <p>${movieDetails.Runtime}</p>
              <p>${movieDetails.Genre}</p>
              <span data-add="${movieDetails.imdbID}">
                  ${!isInWatchlist(movieDetails.imdbID)? `<i class="fa-solid fa-circle-plus"></i> <p>Watchlist</p>` :   `<i class="fa-solid fa-circle-minus"></i> <p>Remove</p>` }
                  
                  
              </span>
          </div>
          <p class="movie__plot" id="movie__plot">${movieDetails.Plot}<a>see more</a></p>
      </div>
    </div>
    <hr>
                    `
                }
            )   
                
            })
    
    }
  }


// getMovieDetails(movieId)
// .then(movieDetails => {
//   newHTML += 
//   `
//   <div class="movie" id=${movieId}>
//   <img class="movie__poster" src=${movieDetails.Poster} />
//   <div class="movie__details">
//       <p class="movie__title">${movieDetails.Title}
//           <span class="movie__rating">
//           <i class="fa-solid fa-star star"></i>
//            ${movieDetails.imdbRating}
//           </span>
//       </p>
//       <div class="movie__genres">
//           <p>${movieDetails.Runtime}</p>
//           <p>${movieDetails.Genre}</p>
//           <span data-add="${movieDetails.imdbID}">
//               ${!isInWatchlist(movieDetails.imdbID)? `<i class="fa-solid fa-circle-plus"></i> <p>Watchlist</p>` :   `<i class="fa-solid fa-circle-minus"></i> <p>Remove</p>` }
              
              
//           </span>
//       </div>
//       <p class="movie__plot" id="movie__plot">${movieDetails.Plot}<a>see more</a></p>
//   </div>
// </div>
// <hr>

//   `
// //   moviesPlaceHolder.innerHTML = newHTML
// })
// });
// mainBody.innerHTML = newHTML;