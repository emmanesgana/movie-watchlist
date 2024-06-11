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



// check if search page
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
                        <div id="btn">
                        <button class="watchlist-btn add" data-add=${imdbID}>
                            <i class="fa-solid fa-circle-plus" style="color: #000000;"></i>
                            Watchlist
                        </button>
                        </div>
                        
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

function addToWatchlist(data) {
    const watchListBtn = document.querySelectorAll('.add')
    for (let i = 0; i < watchListBtn.length; i++) {
        watchListBtn[i].addEventListener('click', (e) => {
            e.preventDefault()
            watchListBtn[i].innerHTML = `
                <i class="fa-solid fa-circle-check" style="color: #26a269;"></i>
                Saved
            `
            watchListBtn[i].disabled = true
            watchlistArr.push(data[i])
            localStorage.setItem('watchlistArr', JSON.stringify(watchlistArr))
        })
    }
}

// function checkLocalStorage(){
//     watchlistLocalStorage
// }

// console.log(watchlistLocalStorage[0].Title)