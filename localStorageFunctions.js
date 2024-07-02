export function addToLocalStorageWatchlist(movieId)
{
  // Example usage when adding a movie to the watchlist
// const movieToAdd = { id: "12345", title: "The Movie Title" };
const currentWatchlist = getWatchlist();
currentWatchlist.push(movieId);
saveWatchlist(currentWatchlist);
}

export function getWatchlist() {
  const watchlistData = localStorage.getItem("watchlist");
  return watchlistData ? JSON.parse(watchlistData) : []; // Return empty array if no data exists
}

// Function to save the watchlist to local storage
export function saveWatchlist(watchlist) {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
export function isInWatchlist(movieId) {
  try {
    // 1. Retrieve watchlist data from local storage
    const watchlistData = localStorage.getItem("watchlist");

    // 2. Parse JSON if data exists
    const watchlist = watchlistData ? JSON.parse(watchlistData) : [];

    // 3. Check if movie exists using some method
    return watchlist.some(movie => movie === movieId);
  } catch (error) {
    // 4. Handle errors (optional)
    console.error("Error accessing watchlist from local storage:", error);
    return false; // Or another default value if error occurs
  }
}

export async function getMovieDetails(id)
{
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=346c7a0c`)
  const data = await res.json()
  // console.log(data)
  return data
}

export function removeFromLocalStorageWatchList(elementId) {
    try {
        console.log("in watchlist removal function")
      // 1. Retrieve data from local storage
      const watchlistData = localStorage.getItem("watchlist");
  
      // 2. Parse JSON if data exists
      const watchlist = watchlistData ? JSON.parse(watchlistData) : [];
  
      // 3. Filter out the element to remove
    //   function deleteFromArr(arr, element) {
    //     return arr.filter(item => item !== element);
    //   }
      const filteredWatchlist = watchlist.filter(movie => movie !== elementId);
        console.log(filteredWatchlist)
      // 4. Save the updated data (if changes were made)
      if (watchlist.length !== filteredWatchlist.length) {
        localStorage.setItem("watchlist", JSON.stringify(filteredWatchlist));
      }
    } catch (error) {
      // 5. Handle errors (optional)
      console.error("Error removing element from local storage:", error);
    }
  }