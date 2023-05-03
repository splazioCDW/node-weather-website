// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=05e11158a01aed2ddf3bbfb5526b9e84&query=' + latitude + ',' + longitude + '&units=f'

    // request({ url: url, json: true}, (error, response) => {
    // descructuring
    request({ url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service.', undefined)
        // } else if (response.body.error) {
        //destructuing
        } else if (body.error) {

            callback('Unable to find location, latitude: ' + latitude + ' logitude: ' + longitude, undefined)
       } else {
            // callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
            //destructuring (revove 'response.' before body)
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')

        }
    })
}

module.exports = forecast