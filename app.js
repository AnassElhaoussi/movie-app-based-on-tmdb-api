
const cards = document.querySelectorAll('.card')
const overviews = document.querySelectorAll('.overview')


cards.forEach(card => {
    card.addEventListener('click', () => {
        overviews.forEach(overview => {
            overview.classList.toggle('isactive')
        })
        
    
    })

})
