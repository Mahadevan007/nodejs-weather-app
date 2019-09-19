const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/734ac32d5d74d758839f234b498dced6/' + encodeURIComponent(latitude) + ','+encodeURIComponent(longitude)

    request({ url , json: true }, (error, {body} ) => {
        if(error)
        {
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location',undefined)
        }
        else
        {
            callback(undefined, body.daily.data[0].summary + ' It is currently in '+ body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability +'% chance of rain')
        }
    })

}

module.exports = forecast