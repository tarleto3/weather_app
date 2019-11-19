const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/afbe6b3fcf7269f3307ebeb9e3e5db7e/' + latitude + ',' + longitude + '?lang=en'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Network connection failed. Please check your network connection', undefined)
        } else if (body.error) {
            callback('The weather could not be pulled for the coordinates provided.', undefined)
        } else {
            // const currentWeather = response.body.currently
            // console.log(chalk.green(response.body.daily.data[0].summary + ' It is currently ' + currentWeather.temperature + ' out. There is a ' + currentWeather.precipProbability + '% chance of rain.'))

            callback(undefined, 
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' °F' + ' out. There is a ' + body.currently.precipProbability + '% chance of rain.' + ' The High for today is ' + body.daily.data[0].temperatureHigh + ' °F.' + ' The Low for today is ' + body.daily.data[0].temperatureLow + ' °F. ')
        }


    })
}

module.exports = forecast