// client side javascript

/*fetch('http://localhost:3000/weather?address=heusden-zolder').then((response) => {
    response.json().then((data) => {
        if(data.error) {
        console.log(data.error)
       } else {
        console.log(data.location)
        console.log(data.forecast)
        console.log(data.address)
       }
       
    })
})*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const place = document.querySelector('#place')
const forecast = document.querySelector('#forecast')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    forecast.textContent = 'Loading...'
    place.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                forecast.textContent = data.error
            } else {
                place.textContent = data.location
                forecast.textContent = data.forecast
           }
           
        })
    })
})