// fetch is similar to request it takes in url and
// Then a call back function. It is a asynchronous.
const form = document.querySelector("form")
const search = form.querySelector("input")
const locationPlace = document.querySelector(".location")
const forecastPlace = document.querySelector(".forecast")

form.addEventListener("submit",(e) => {
    e.preventDefault()

    const location = search.value
    locationPlace.textContent = "loading..."
    forecastPlace.textContent = ""
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                locationPlace.textContent = data.error
            }
            else{
                locationPlace.textContent = data.location
                forecastPlace.textContent = data.forecast
            }
        })
    })
})


