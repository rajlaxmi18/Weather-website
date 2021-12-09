const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmFqbGF4bWkwMSIsImEiOiJja3dpN2lqMXkxNXEzMnduczZ1NnlnZGtjIn0.P_o5Lnx9X7mj4gSo-eIUBA&limit=1";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to geocoder service!");
    } else if (body.features.length === 0) {
      callback("Unable to find the location!");
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[0],
        longitude: body.features[0].geometry.coordinates[1],
        location: body.features[0].text,
      });
    }
  });
};

module.exports = geocode;
