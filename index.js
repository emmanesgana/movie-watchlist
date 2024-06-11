let moviesHtml = ''
let moviesArr = []
let watchlistArr = []
let watchlistLocalStorage = JSON.parse(localStorage.getItem('watchlistArr'))
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const form = document.getElementById('form')
const searchResults = document.getElementById('container-search-results')
const watchList = document.getElementById('container-watchlist')
const empty = document.getElementById('empty')

if (!watchList) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (form) {
            moviesArr = []
            searchResults.innerHTML = ''
            getMovies(searchInput.value)
        }
    })
}

async function getMovies(value) {
    try {
        moviesArr = []
        searchResults.innerHTML = ''
        const resValue = await fetch(`https://www.omdbapi.com/?s=${value}&type=movie&apikey=c83db659`)
        const preData = await resValue.json()
        for (let movies of preData.Search) {
            // console.log('movie', movies)
            const resImdbId = await fetch(`https://www.omdbapi.com/?i=${movies.imdbID}&type=movie&apikey=c83db659`)
            const postData = await resImdbId.json()
            moviesArr.push(postData)
        }
        renderSearchResults(moviesArr)
        addToWatchlist(moviesArr)
    } catch (err) {
        empty.style.display = 'none'
        renderFailedSearch()
    }
}

function addToWatchlist(data) {
    // add to watchlist
    // console.log(data)
    const watchListBtn = document.querySelectorAll('.watchlist-btn')
    for (let i = 0; i < watchListBtn.length; i++) {
        watchListBtn[i].addEventListener('click', (e) => {
            e.preventDefault()
            watchListBtn[i].innerHTML = `
                <i class="fa-solid fa-circle-check" style="color: #26a269;"></i>
                Saved
            `
            watchlistArr.push(data[i])
            // console.log(watchlistArr)
            localStorage.setItem('watchlistLocalStorage', JSON.stringify(watchlistArr))
        })
    }
}

function renderSearchResults(data) {
    for (let movie of data) {
        const {
            Poster,
            Title,
            imdbRating,
            Runtime,
            Genre,
            imdbID,
            Plot
        } = movie

        searchResults.innerHTML += `
        <div class="container-movie">
            <div class="poster">
                <img src=${Poster}  alt="movie-poster" class="poster"> 
            </div>
            <div class="movie-info">
                <div class="movie-data">
                    <h3 class="movie-title">${Title}</h2>
                    <p class="rating"><i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${imdbRating}</p>
                </div>
                <div class="movie-details">
                    <p class="runtime">${Runtime}</p>
                    <p class="genre">${Genre}</p>
                    <button class="watchlist-btn">
                        <i class="fa-solid fa-circle-plus" style="color: #000000;"></i>
                        Watchlist
                    </button>
                </div>
                <p class="plot">${Plot}</p>
            </div>
        </div>
        `
    }
}

function renderFailedSearch() {
    searchResults.innerHTML = `
        <div class="container-search-failed">
            <h3>Unable to find what you&#39;re looking for. Please try another search.</h1>
        </div >
        `
}

// watchlist
if (watchlistLocalStorage) {
    watchlistArr = watchlistLocalStorage
}

if (watchList) {

}