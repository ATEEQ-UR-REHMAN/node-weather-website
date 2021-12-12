import request from "request";

// Geocoding
// Address => latitude/longitude => weather

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYXRlZXFheml6Nzg2IiwiYSI6ImNrd3ViMHdpcjBoMncycW1pMmxhc3l2M2gifQ.OadyrTGC7wBnyQhOMbtLEQ&limit=1";

    request({ url: url, json: true}, (error, { body }) => {
        if(error) {
            callback("Unable to connect to the services!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find the location. Try another search!", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

export default geocode;

// const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/philadeplhia.json?access_token=pk.eyJ1IjoiYXRlZXFheml6Nzg2IiwiYSI6ImNrd3ViMHdpcjBoMncycW1pMmxhc3l2M2gifQ.OadyrTGC7wBnyQhOMbtLEQ&limit=1";

// request({url: geocodeURL, json: true}, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to weather service!");
//     } else if (response.body.features.length === 0) {
//         console.log("Unable to find location. Try another search");
//     } else {
//         const latitude = response.body.features[0].center[0];
//         const longitude = response.body.features[0].center[1];
//         console.log(latitude, longitude);
//     }
// });