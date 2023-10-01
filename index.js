const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIP("99.225.235.132", (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log(`It worked! Latitude: ${data.latitude}, Longitude: ${data.longitude}`);
});