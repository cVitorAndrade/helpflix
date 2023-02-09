import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

const poster = document.querySelector('.movie div img')
const movieTitle = document.querySelector('.movie h2')
const movieDescription = document.querySelector('.movie div p')
const buttonGetMovie = document.querySelector('button')

buttonGetMovie.addEventListener('click', getMovie)
window.onload = getMovie()

async function  getMovie() {
  let randomId = Math.floor(Math.random() * 500)

  const movie = await fetch(`${BASE_URL}${randomId}?api_key=${API_KEY}&${language}`)
  .then(data => data.json())
  .then(json => {
    if(!json.poster_path || !json.overview || !json.title) {
      poster.src = "./assets/favico/PosterNotFound.png"
      movieDescription.textContent = ""
      movieTitle.textContent = "Ops, hoje não é dia de assistir filme. Bora codar! 🚀"
      return
    }

    return json
  })
   poster.src = `${IMG_URL}${movie.poster_path}`
   movieTitle.textContent = movie.title
   movieDescription.textContent = movie.overview
}

