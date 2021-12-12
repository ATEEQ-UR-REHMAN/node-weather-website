import request from "request";

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=1aad2a136bbaba33324cd2ea6470b841&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=f";

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback("Unable to connect to the weather service!", undefined);
        } else if(body.error) {
            callback("Unable to find the location. Try another search", undefined);
        } else {
            console.log(body.current)
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out. The humidity is " + body.current.humidity +"%.");
        }
    })
}

export default forecast;

// const url = "http://api.weatherstack.com/current?access_key=1aad2a136bbaba33324cd2ea6470b841&query=44.1545,-75.7088&units=f";

// request( {url: url, json: true}, (error, response) => {

//     if (error) {
//         console.log("Unable to connect to weather service!");
//     } else if (response.body.error) {
//         console.log("Unable to find location!");
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out.");
//     }
// });