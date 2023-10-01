// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("99.225.235.132", (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(`It worked! The coordinates based on the IP are:`, data);
// });

// fetchISSFlyOverTimes({ latitude: 43.5448048, longitude: -80.2481666 }, (error, passTimes) => {
//   if(error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(`It worked! This is the schedule for ISS flyover`, passTimes)

// })

const { nextISSTimesForMyLocation } = require("./iss");

const printPassTimes = function(passTimes) {
  for (let pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("it didnt't work!", error);
  }

  printPassTimes(passTimes)
})