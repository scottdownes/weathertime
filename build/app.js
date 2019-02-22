"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var z2t = require("zipcode-to-timezone");
var cityTimezones = require("city-timezones");
var WeatherApiService_1 = require("./WeatherApiService");
var app = express();
var relevantArgs = process.argv.filter(function (argument, index) {
    if (index > 1) {
        return argument;
    }
});
processInput(relevantArgs);
function processInput(locations) {
    var weatherSvc = new WeatherApiService_1.WeatherApiService('8937a7f75d3d5a6e30b44ea349b84583');
    var _loop_1 = function (location_1) {
        if (isNaN(+location_1)) {
            weatherSvc.getWeatherByCity(location_1, function (weatherInfo) {
                var timeZone = cityTimezones.lookupViaCity(location_1)[0].timezone;
                var localTime = new Date().toLocaleString("en-US", { timeZone: timeZone });
                console.log('Current weather in ' + location_1 + ' is ' + weatherInfo.weather[0].description +
                    ' and the current time is ' + localTime);
            });
        }
        else {
            weatherSvc.getWeatherByZipcode(location_1, function (weatherInfo) {
                var localTime = new Date().toLocaleString("en-US", { timeZone: z2t.lookup(location_1) });
                console.log('Current weather in the zipcode ' + location_1 + ' is ' + weatherInfo.weather[0].description +
                    ' and the current time is ' + localTime);
            });
        }
    };
    for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
        var location_1 = locations_1[_i];
        _loop_1(location_1);
    }
}
app.get('/', function (req, res) {
    var locations = ['37405'];
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
});
