let moviesHtml = ''
let moviesArr = []
let watchlistArr = []
let watchlistLocalStorage = localStorage.getItem('watchlistArr') ? JSON.parse(localStorage.getItem('watchlistArr')) : []
let idToStorage = localStorage.getItem('idToStorage')
let addId = idToStorage ? JSON.parse(idToStorage) : []
const watchList = document.getElementById('container-watchlist')

if (watchlistLocalStorage) {
    watchlistArr = watchlistLocalStorage
}

renderWatchlist(watchlistArr)

document.addEventListener('click', (e) => {
    const btnRemove = e.target.dataset.remove
    let filtered = addId.filter(mov => btnRemove !== mov)
    if (btnRemove) {
        removeFromWatchList(btnRemove)
        localStorage.setItem('idToStorage', JSON.stringify(filtered))
    }
})

function removeFromWatchList(btnId) {
    watchList.innerHTML = ''
    for (let movie of watchlistArr) {
        if (btnId === movie.imdbID) {
            let movieIndex = watchlistArr.indexOf(movie)
            watchlistArr.splice(movieIndex, 1)
            localStorage.setItem('watchlistArr', JSON.stringify(watchlistArr))
            renderWatchlist(watchlistArr)
        }
    }
}

function renderWatchlist(data) {
    if (watchlistArr.length > 0) {
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

            watchList.innerHTML += `
        <div class="container-movie" id="container-movie">
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
                    <button class="remove watchlist-btn remove" data-remove=${imdbID}>
                        <i class="fa-solid fa-circle-minus" style="color: #000000;"></i>
                        Remove
                    </button>
                </div>
                <p class="plot">${Plot}</p>
            </div>
        </div>
        `
        }

    } else {
        renderEmpty()
    }
}

function renderEmpty() {
    watchList.innerHTML = `
            <div class="container-empty" id="empty">
                <p class="watchlist-empty">Your watchlist is a little empty</p>
                <a href="./index.html" class="watchlist-return"><i class="fa-solid fa-circle-plus" style="color: #000000;"></i> Let's add some movies!</a>
            </div>
        `
}