const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const darkSkyToken = '79fee6483e2233763060ef1b0997406a'
    const url = 'https://api.darksky.net/forecast/' + darkSkyToken + '/' 
        + encodeURIComponent(latitude) + ',' 
        + encodeURIComponent(longitude) + '?units=si'
    console.log(url)
        request({ url, json: true }, (error, { body }) => {
            if(error) {
                callback('Unable to connect to weather service', undefined)
            } else if(body.error) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, body.daily.data[0].summary + ' Het is momenteel ' + body.currently.temperature 
                    + ' °C. Er is ' + body.currently.precipProbability + '% kans op regen')
            }
        })
}

module.exports = forecast