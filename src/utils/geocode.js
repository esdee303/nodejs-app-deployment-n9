const request = require('request')

const geocode = (address, callback) => {
    const mapBoxToken = 'pk.eyJ1IjoiZXNkZWUzMDMiLCJhIjoiY2p3YjdjdXA0MGdmYzQ0bW04ZGs4NGw4ZCJ9.2Vf3PjCMxOPTAwhyXppmSw'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?language=nl&limit=1&access_token=' + mapBoxToken 
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
            // console.log(chalk.black.bgRed.bold('Unable to connect to location services'))
        } else if(body.features.length === 0) {
            callback('Unable to find location', undefined)
            // console.log(chalk.black.bgRed.bold('Unable to find location'))
        } else {
            console.log(body.features[0].center[1])
            console.log(body.features[0].center[0])
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode