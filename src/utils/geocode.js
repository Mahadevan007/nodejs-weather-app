const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGV2YW4xMjM0IiwiYSI6ImNrMGd2OTFsbzA0cG0zaWxqMnF1dHhuZXIifQ.gQ-rJ_23k_Gr5i5Dsgi5Jg'

    request({ url: url, json: true }, (error, {body} ) => {
        if (error) {
            callback("Unable to find location services", undefined)
        }
        else if (body.features.length === 0) {
            callback("Unable to find location. Please try again", undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode