const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const API_KEY = `a40777d8bae9cd2745c21dec22a090eb`;
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${latitude},${longitude}`;

  // Before property shorthand syntax because { url : url } uses the same key 
  // Before destructuring: 
  // request({ url, json: true }, (error, response)
  // reponse is an object where the only value we reference is body
  request({ url, json: true }, (error, { body } = {}) => {
    // Low level OS error like low connectivity <error>
    if (error) {
      callback("Unable to connect to weather service!", undefined);

      // API errors come back in the <response>
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const weatherDescription = body.current.weather_descriptions[0];
      const currentTemp = body.current.temperature;
      const feelsLikeTemp = body.current.feelslike;

      callback(
        undefined,
        `${weatherDescription}. It is currently ${currentTemp} degrees. It feels like ${feelsLikeTemp} degrees out.`
      );
    }
  });
};

module.exports = forecast;
