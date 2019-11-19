// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorDoc = document.querySelector('#error')
const weatherData = document.querySelector('#content')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    weatherData.textContent = 'Loading...'
    errorDoc.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorDoc.textContent = data.error
                weatherData.textContent = ''
            } else {
                errorDoc.textContent = ''
                weatherData.textContent = data.location + ' is: ' + data.forecast
            }
        })
    })


})