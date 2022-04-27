
const API_KEY =  'api_key=dfaa2effcf2a2d78c559c0278db75f00'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'
const mainSection = document.querySelector('.main-section')
const inputField = document.querySelector(".inputField")
const SEARCH_URL = `${BASE_URL}/search/movie?${API_KEY}`
const tagsElements = document.querySelector('.tags')


const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

let selectedGenre = []
const displayGenres = () => {
    tagsElements.innerHTML = ""
    genres.forEach(genre => {
        const el = document.createElement('div')
        el.classList.add('tag')
        el.innerHTML = genre.name
        el.id = genre.id
        tagsElements.append(el)

        el.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id)
                
            }
            else {
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, index) => {
                        if(id == genre.id){
                            selectedGenre.splice(index, 1)
                        }
                    })
                }

            }
            

            fetchData(`${API_URL}&with_genres=${encodeURI(selectedGenre.join(","))}`)

            

            
            

        })

        
    })
}

displayGenres()

const fetchData = (api) => {
    fetch(api).then(response => {
        return response.json()
    }).then(data => {
        console.log(data);
        displayMovies(data.results)
    })
}

fetchData(API_URL)






const displayMovies = cards => {
    mainSection.innerHTML = ""

    cards.forEach(card => {
        const movieElement = document.createElement('div')
        movieElement.classList.add('card')

        movieElement.innerHTML = `
        <img src="${IMAGE_URL + card.poster_path}" alt="image">
        <div class="text-content">
            <div class="main-text">
                <h3>${card.original_title}</h3>
                <p class="${voteColor(card.vote_average)}">${card.vote_average}</p>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${card.overview}</p>
                
            </div>
        </div>

        `


    mainSection.appendChild(movieElement)
        
    });

    
}

inputField.addEventListener('keyup', e => {
    
    const {value} = e.target

    if(value){
        fetchData(SEARCH_URL+"&query="+value)
    } else {
        fetchData(API_URL)
    }

})

const voteColor = rating => { 

    if(rating < 7){
        return "yellow"
    }

}







