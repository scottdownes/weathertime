import express = require('express');
import z2t = require('zipcode-to-timezone');
import cityTimezones = require('city-timezones');
import {WeatherApiService} from './WeatherApiService';

const app: express.Application = express();
let relevantArgs = process.argv.filter(function(argument, index) {
	if (index > 1) {
	  return argument;
	}
});
processInput(relevantArgs);

function processInput(locations: string[]) {
  let weatherSvc = new WeatherApiService('8937a7f75d3d5a6e30b44ea349b84583');

  for (let location of locations) {
    if (isNaN(+location)) {
  	  weatherSvc.getWeatherByCity(location, (weatherInfo: any) => {
  	    let timeZone = cityTimezones.lookupViaCity(location)[0].timezone;
  	    let localTime = new Date().toLocaleString("en-US", {timeZone: timeZone});
      	console.log('Current weather in ' + location + ' is ' + weatherInfo.weather[0].description + 
      	    ' and the current time is ' + localTime);
  	  });
    } else {
  	  weatherSvc.getWeatherByZipcode(location, (weatherInfo: any) => {
  	    let localTime = new Date().toLocaleString("en-US", {timeZone: z2t.lookup(location)});
      	console.log('Current weather in the zipcode ' + location + ' is ' + weatherInfo.weather[0].description +
      	    ' and the current time is ' + localTime);
  	  });
  	}
  }
}

app.get('/', function (req, res) {
  let locations = [ '37405' ];

  // deal with the uncertain type of req.query
  if (req.query.location) {
  	if (req.query.location instanceof Array) {
      locations = req.query.location;
    }
    else {
      locations[0] = req.query.location;
    }
  }

  processInput(locations);
  res.send('Processing now underway. See console for results');
});

app.listen(8080, function () {
  console.log('listening on port 8080');
})

