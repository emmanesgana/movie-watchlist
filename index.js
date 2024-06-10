let moviesArr = []
let moviesHtml = ''
let watchlistArr = []
let watchlistLocalStorage = JSON.parse(localStorage.getItem('watchlist'))
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const form = document.getElementById('form')
const searchResults = document.getElementById('container-search-results')
const empty = document.getElementById('empty')

if (watchlistLocalStorage) {
    watchlistArr = watchlistLocalStorage
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        let searchInputValue = searchInput.value
        const res = await fetch(`https://www.omdbapi.com/?s=${searchInputValue}&type=movie&apikey=c83db659`)
        const data = await res.json()
        moviesArr = []
        moviesHtml = ''
        for (let movies of data.Search) {
            getMovies(movies.imdbID)
        }

    } catch (err) {
        empty.style.display = 'none'
        renderFailedSearch()
    }

})

async function getMovies(imdbId) {
    try {
        const res = await fetch(`https://www.omdbapi.com/?i=${imdbId}&type=movie&apikey=c83db659`)
        const data = await res.json()
        moviesArr.push(data)
        searchResultsHtml(data)
        renderSearchResults()
    } catch (err) {
        alert('Error')
    }
}

function searchResultsHtml(info) {
    const {
        Poster,
        Title,
        imdbRating,
        Runtime,
        Genre,
        imdbID,
        Plot
    } = info


    moviesHtml += `
        <div class="container-movie">
            <div class="poster">
                <img src=${Poster}  alt="movie-poster" class="poster"> 
            </div>
            <div class="movie-info">
                <div class="movie-data">
                    <h3 class="movie-title">${Title}</h2>
                    <p class="rating">⭐ ${imdbRating}</p>
                </div>
                <div class="movie-details">
                    <p class="runtime">${Runtime}</p>
                    <p class="genre">${Genre}</p>
                    <button class="add-remove-btn" data-id=${imdbID}>
                        <i class="fa-solid fa-circle-plus" style="color: #000000;"></i>
                        Watchlist
                    </button>
                </div>
                <p class="plot">${Plot}</p>
            </div>
        </div>
        `
}

function renderFailedSearch() {
    searchResults.innerHTML = `
        <div class="container-search-failed">
            <h3>Unable to find what you&#39;re looking for. Please try another search.</h1>
        </div >
        `
}

function renderSearchResults() {
    searchResults.innerHTML = moviesHtml
}
