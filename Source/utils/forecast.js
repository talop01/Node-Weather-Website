const request = require("request")

const forecast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d32deb0c49cf65f04354393d3b1c851c&query=${Number(latitude)},${Number(longitude)}&units=m`
    request({url,json:true},(error,response) => {
        if (error){
            callback("Unable to connect to weather API!",undefined)
        }
        else if(response.body.error){
            callback("Unable to find location",undefined)
        }
        else{
            const general = response.body.current
            callback(undefined,`It is ${general.weather_descriptions[0]}. It is ${general.temperature} degree celcius but it feels like ${general.feelslike} degree celcius.`)
       }
    })
}

module.exports = forecast;