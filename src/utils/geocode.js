const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGFybGV0bzMiLCJhIjoiY2sybWRka3FtMGd1MjNocGhxa2xjODc2biJ9.3DCXgvhyLZjOMNms_qHH0w&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('The resource could not be accessed.', undefined)
        } else if (body.features.length == 0) {
            callback('The reqested location could not be found', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode