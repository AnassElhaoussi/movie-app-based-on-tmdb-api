
const API_KEY =  'dfaa2effcf2a2d78c559c0278db75f00'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'
const mainSection = document.querySelector('.main-section')
const inputField = document.querySelector(".navigation input")



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
    const movieName = document.querySelectorAll(".main-text h3")

    movieName.forEach(name => {
        if(name.innerHTML.toLowerCase().includes(value.toLowerCase())){
            name.parentElement.parentElement.parentElement.style.display = "block"            
        } else {
            name.parentElement.parentElement.parentElement.style.display = "none"
        }

    })


})

const voteColor = rating => { 

    if(rating < 8){
        return "yellow"
    }

    else if(rating <= 6 ){
        return "orange"
    }


}







