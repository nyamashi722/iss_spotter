/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("http://ipwho.is/", (error, response, body) => {
    //if page returns an error, return the error message
    if (error) {
      return callback(error, null);
    }
    //error handling if no error is returned but there is still a problem with the response
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if no errors above occur, parse it and return IP address
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  //make request to API to retrieve lat/lng
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;
    return callback(null, { latitude, longitude });

  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};


